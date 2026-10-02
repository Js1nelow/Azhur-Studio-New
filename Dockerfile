# Этап 1: Сборка
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем все зависимости (включая dev)
RUN npm install

# Копируем исходный код
COPY . .

# Собираем фронтенд (Vite) и бэкенд (esbuild)
RUN npm run build

# Этап 2: Продакшн образ
FROM node:20-alpine

WORKDIR /app

# Копируем только файлы зависимостей
COPY package*.json ./

# Устанавливаем только продакшн зависимости
RUN npm install --omit=dev

# Копируем собранное приложение из первого этапа
COPY --from=builder /app/dist ./dist

# Устанавливаем production окружение
ENV NODE_ENV=production

# Создаем непривилегированного пользователя для безопасности
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Указываем порт (в server.ts жестко задан 3000)
EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]
