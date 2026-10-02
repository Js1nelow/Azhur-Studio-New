import { motion } from 'motion/react';
import { Award, ShieldCheck, Users } from 'lucide-react';

export function AboutBlock() {
  const stats = [
    { value: "17 лет", label: "опыта в монтаже потолков", icon: <Award className="w-5 h-5 text-brand-red" /> },
    { value: "1000+", label: "квартир и домов в Москве и МО", icon: <Users className="w-5 h-5 text-brand-red" /> },
    { value: "10 лет", label: "официальная гарантия по договору", icon: <ShieldCheck className="w-5 h-5 text-brand-red" /> }
  ];

  return (
    <section id="about" className="relative bg-white py-20 md:py-28 border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Олег Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-[420px] rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white"
            >
              <img
                src="/azhur/photo/o_nas.webp"
                alt="Олег Мисягин — основатель студии Ажур"
                className="w-full aspect-[3/4] object-cover"
              />
              
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="text-base font-bold text-gray-950">Олег Мисягин</div>
                <div className="text-xs text-gray-600 mt-0.5">Основатель и ведущий мастер «Ажур Студии»</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Narrative & Stats */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight">
                Мастерский подход к каждому метру
              </h2>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                «Ажур Студия» — это не безликий агрегатор с наёмными случайными бригадами. Я лично руковожу каждым проектом, выезжаю на замер, рассчитываю смету и отвечаю своей репутацией за результат.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Мы используем только безопасные сертифицированные полотна без резкого запаха и работаем с пылесосом, чтобы в вашем доме было чисто и комфортно с первого дня.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="mb-2">{stat.icon}</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600 mt-1 font-medium leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
