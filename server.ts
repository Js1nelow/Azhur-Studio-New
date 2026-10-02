import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import * as dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss';

dotenv.config();

const app = express();
app.set('trust proxy', 1); // Trust first proxy for express-rate-limit

// Заголовки безопасности (X-Content-Type-Options, X-Frame-Options, HSTS и др.)
app.use(helmet({
  contentSecurityPolicy: false, // Отключаем CSP чтобы не ломать inline-стили React
}));

const PORT = 3000;

// Ограничение CORS (разрешаем только наш домен)
const allowedOrigins = [
  process.env.APP_URL,
  'http://localhost:3000',
  // Разрешаем dev и preview URL AI Studio
  'https://ais-dev-yjrkwil3mis5hnipw4e43x-458080331442.europe-west2.run.app',
  'https://ais-pre-yjrkwil3mis5hnipw4e43x-458080331442.europe-west2.run.app',
  'https://ажурстудио.рф',
  'https://xn--80aaigj8bheoc1c.xn--p1ai' // Punycode для ажурстудио.рф
].filter(Boolean);

// Применяем CORS только для API маршрутов, чтобы не блокировать статические файлы (JS/CSS)
app.use('/api', cors({
  origin: function (origin, callback) {
    // Разрешаем запросы без origin (например, server-to-server) 
    // или если origin в списке разрешенных
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS: ' + origin));
    }
  },
  methods: ['POST', 'GET', 'OPTIONS'],
}));

// Ограничение размера JSON payload до 10kb (защита от DoS)
app.use(express.json({ limit: '10kb' }));

// Настройка Rate Limiting для API (защита от спама)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 10, // Ограничение: 10 запросов с одного IP за 15 минут
  message: { success: false, error: 'Слишком много запросов. Пожалуйста, подождите немного.' },
  standardHeaders: true,
  legacyHeaders: false,
});

interface LeadRequest {
  name?: string;
  phone: string;
  comment?: string;
  source?: string;
  details?: string;
}

// API route to send lead to Max Bot
app.post('/api/send-lead', apiLimiter, async (req: express.Request<{}, {}, LeadRequest>, res: express.Response) => {
  try {
    const { name, phone, comment, source, details } = req.body;
    
    const safeName = name ? xss(name) : undefined;
    const safePhone = phone ? xss(phone) : '';
    const safeComment = comment ? xss(comment) : undefined;
    const safeSource = source ? xss(source) : undefined;
    const safeDetails = details ? xss(details) : undefined;

    // Бэкенд-валидация: обязательные поля и их разумная длина
    if (!safePhone || typeof safePhone !== 'string' || safePhone.replace(/\D/g, '').length < 11) {
      return res.status(400).json({ success: false, error: 'Некорректный номер телефона' });
    }

    if (safeName && safeName.length > 100) return res.status(400).json({ success: false, error: 'Имя слишком длинное' });
    if (safeComment && safeComment.length > 1000) return res.status(400).json({ success: false, error: 'Комментарий слишком длинный' });
    if (safeSource && safeSource.length > 200) return res.status(400).json({ success: false, error: 'Поле источника слишком длинное' });
    if (safeDetails && safeDetails.length > 500) return res.status(400).json({ success: false, error: 'Поле деталей слишком длинное' });

    // Format the message
    let messageText = `🔥 Новая заявка с сайта!\n\n`;
    if (safeSource) messageText += `Форма: ${safeSource}\n`;
    if (safeName) messageText += `Имя: ${safeName}\n`;
    messageText += `Телефон: ${safePhone}\n`;
    if (safeDetails) messageText += `Детали: ${safeDetails}\n`;
    if (safeComment) messageText += `Комментарий: ${safeComment}\n`;

    const maxBotToken = process.env.MAX_BOT_TOKEN;
    const maxChannelId = process.env.MAX_CHANNEL_ID;
    const maxChannelId2 = process.env.MAX_CHANNEL_ID_2;

    if (!maxBotToken || !maxChannelId) {
      console.warn("MAX_BOT_TOKEN or MAX_CHANNEL_ID is not set in environment variables. Simulating success.");
      return res.json({ success: true, simulated: true });
    }

    // Отправляем всем получателям параллельно
    const recipients = [maxChannelId, maxChannelId2].filter(Boolean) as string[];

    const sendToRecipient = async (chatId: string) => {
      const url = `https://platform-api.max.ru/messages?user_id=${chatId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${maxBotToken}`,
        },
        body: JSON.stringify({ text: messageText }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Max API error [chat ${chatId}]: ${response.statusText}`;
        try {
          const errorJson = JSON.parse(errorText);
          if (response.status === 404 && errorJson.code === 'chat.not.found') {
            errorMessage = `Чат ${chatId}: откройте диалог с ботом перед получением сообщений.`;
          } else {
            errorMessage = errorJson.message || errorMessage;
          }
        } catch (_) { /* ignore */ }
        throw new Error(errorMessage);
      }
      return response.json();
    };

    const results = await Promise.allSettled(recipients.map(sendToRecipient));

    const failed = results.filter(r => r.status === 'rejected') as PromiseRejectedResult[];
    if (failed.length > 0) {
      failed.forEach(f => console.error('MAX send error:', f.reason?.message));
      // Если хотя бы один успешен — считаем успехом
      const anySuccess = results.some(r => r.status === 'fulfilled');
      if (!anySuccess) throw new Error(failed[0].reason?.message || 'Ошибка отправки');
    }

    res.json({ success: true, sent: recipients.length - failed.length });
  } catch (error: any) {
    console.error('Error sending lead to Max Bot:', error.message);
    // Не отправляем внутренние ошибки на клиент
    res.status(500).json({ success: false, error: 'Внутренняя ошибка сервера. Пожалуйста, попробуйте позже.' });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production' || (process.argv[1] && process.argv[1].endsWith('server.cjs'));

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const publicPath = path.join(process.cwd(), 'public');
    app.use(express.static(distPath));
    app.use(express.static(publicPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
