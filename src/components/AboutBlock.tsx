import { motion } from 'motion/react';
import { Award, ShieldCheck, Users } from 'lucide-react';

export function AboutBlock() {
  const stats = [
    { value: "17 лет", label: "опыта в монтаже потолков", icon: <Award className="w-5 h-5 text-brand-red" /> },
    { value: "1000+", label: "квартир и домов в Москве и МО", icon: <Users className="w-5 h-5 text-brand-red" /> },
    { value: "10 лет", label: "официальная гарантия по договору", icon: <ShieldCheck className="w-5 h-5 text-brand-red" /> }
  ];

  return (
    <section id="about" className="relative bg-[#F6F5F2] py-20 md:py-28 border-t border-stone-200/80 overflow-hidden">
      {/* Ambient Warm Interior Glow */}
      <div className="absolute top-1/2 right-[-5%] w-[550px] h-[550px] bg-gradient-to-bl from-orange-200/20 via-amber-100/15 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Олег Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-[420px] rounded-2xl overflow-hidden border border-stone-200/90 shadow-[0_16px_40px_rgba(0,0,0,0.06)] bg-white"
            >
              <img
                src="/azhur/photo/o_nas.webp"
                alt="Олег Мысягин — основатель студии Ажур"
                className="w-full aspect-[3/4] object-cover"
              />
              
              <div className="p-4 bg-white/95 backdrop-blur-xs border-t border-stone-200">
                <div className="text-base font-bold text-gray-950">Олег Мысягин</div>
                <div className="text-xs text-gray-600 mt-0.5">Основатель и ведущий мастер «Ажур Студии»</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Narrative & Stats */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight">
                Лично отвечаю за каждый замер и монтаж
              </h2>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Меня зовут Олег Мысягин, я занимаюсь натяжными потолками с 2007 года. На замеры приезжаю сам с образцами полотен и профилей. Смету считаю на месте до рубля — сумма в договоре окончательная и не вырастет в ходе работ.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Бригады у нас постоянные, стаж мастеров — от 7 лет. Работаем перфораторами с пылесосом и безопасными полимерными баллонами. Укрываем стены, бережём чистовую отделку и убираем весь мусор после сдачи.
              </p>
            </div>

            {/* Stats row: Elevated white cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-200/80">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow"
                >
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-red flex items-center justify-center mb-3 border border-orange-200/80">
                    {stat.icon}
                  </div>
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
