import type { Metadata } from 'next';
import Link from 'next/link';
import { config } from '@/data/config';

export const metadata: Metadata = {
  title: 'Пользовательское соглашение | FExperience',
  description: 'Правила использования сайта, ограничение ответственности, порядок разрешения споров и условия использования интеллектуальной собственности.',
  alternates: { canonical: `${config.site.url}/terms` },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0D0805] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-10">
          Пользовательское соглашение
        </h1>

        <div className="space-y-8 text-[#A0A0A0] leading-relaxed text-base md:text-lg">
          {/* 1. Общие положения */}
          <section>
            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">1. Общие положения</h2>
            <p>
              Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует порядок использования сайта{' '}
              <Link href="/" className="text-[#F7931A] hover:underline transition-colors">fexperience.forbes.ru</Link> (далее — «Сайт»).
              Пользуясь Сайтом, вы автоматически принимаете условия данного Соглашения. Администрация оставляет за собой право вносить изменения в Соглашение без предварительного уведомления.
            </p>
          </section>

          {/* 2. Правила использования */}
          <section>
            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">2. Правила использования</h2>
            <p>Пользователь обязуется:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Использовать Сайт исключительно в законных целях</li>
              <li>Не нарушать работу серверов, не пытаться получить несанкционированный доступ к данным или функционалу</li>
              <li>Не размещать материалы, нарушающие права третьих лиц, законодательство РФ или содержащие вредоносный код</li>
              <li>Не использовать контент Сайта для коммерческих целей без письменного согласия Администрации</li>
            </ul>
          </section>

          {/* 3. Интеллектуальная собственность */}
          <section>
            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">3. Интеллектуальная собственность</h2>
            <p>
              Все материалы, размещённые на Сайте (тексты, изображения, логотипы, видео, дизайн, программный код, названия экспедиций), являются объектами интеллектуальной собственности АО «АС РУС МЕДИА» или третьих лиц, предоставивших права на использование. Копирование, распространение, модификация или иное использование материалов без предварительного письменного разрешения запрещено.
            </p>
          </section>

          {/* 4. Ограничение ответственности */}
          <section>
            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">4. Ограничение ответственности</h2>
            <p>
              Администрация прилагает все усилия для обеспечения достоверности и актуальности информации на Сайте, однако не гарантирует отсутствие технических ошибок, перерывов в работе или полного соответствия данных реальным условиям участия в бизнес-экспедициях. Сайт предоставляется «как есть» (as is). Администрация не несёт ответственности за прямые или косвенные убытки, возникшие в результате использования или невозможности использования Сайта, а также за действия или бездействие третьих лиц, включая партнёров и подрядчиков.
            </p>
          </section>

          {/* 5. Порядок разрешения споров */}
          <section>
            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">5. Порядок разрешения споров</h2>
            <p>
              В случае возникновения споров, связанных с использованием Сайта или оформлением заявок на участие, стороны обязуются решить их путём переговоров и обмена претензиями. При невозможности досудебного урегулирования спор подлежит рассмотрению в суде по месту нахождения АО «АС РУС МЕДИА» в соответствии с действующим законодательством Российской Федерации.
            </p>
          </section>

          {/* 6. Контактные данные */}
          <section>
            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">6. Контактные данные</h2>
            <div className="bg-[#110F0D] border border-[#2A2A2A] rounded-lg p-6 mt-2">
              <p className="text-white font-medium mb-2">АО «АС РУС МЕДИА»</p>
              <p>Email: <a href="mailto:FExperience@forbes.ru" className="text-[#F7931A] hover:underline transition-colors">FExperience@forbes.ru</a></p>
              <p>Телефон: <a href="tel:+79201949003" className="text-[#F7931A] hover:underline transition-colors">+7 (920) 194-90-03</a></p>
              <p className="mt-2 text-sm text-[#666666]">Дата вступления в силу: 25.04.2026</p>
            </div>
          </section>

          {/* Ссылка на политику */}
          <div className="pt-8 border-t border-[#2A2A2A] text-sm text-[#666666]">
            <p>
              Дополнительную информацию об обработке данных см. в{' '}
              <Link href="/privacy" className="text-[#F7931A] hover:underline transition-colors">Политике конфиденциальности</Link>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}