import type { Metadata } from 'next';
import Link from 'next/link';
import { config } from '@/data/config';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | FExperience',
  description: 'Политика обработки персональных данных в соответствии с 152-ФЗ. Условия сбора, хранения и защиты данных пользователей сайта.',
  alternates: { canonical: `${config.site.url}/privacy` },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0D0805] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-10">
          Политика конфиденциальности
        </h1>

        <div className="space-y-8 text-[#A0A0A0] leading-relaxed text-base md:text-lg">
          {/* 1. Общие положения */}
          <section>
            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных данных пользователей сайта{' '}
              <Link href="/" className="text-[#F7931A] hover:underline transition-colors">fexperience.forbes.ru</Link> (далее — «Сайт»), осуществляемой оператором — АО «АС РУС МЕДИА» (ИНН: 7716236112, ОГРН: 1037716027777), далее — «Оператор».
            </p>
            <p className="mt-2">
              Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и действует в отношении всех персональных данных, которые Оператор может получить от пользователя во время использования Сайта.
            </p>
          </section>

          {/* 2. Состав собираемых данных */}
          <section>
            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">2. Состав собираемых данных</h2>
            <p>Оператор обрабатывает следующие категории данных:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Имя, фамилия, отчество (при наличии)</li>
              <li>Адрес электронной почты</li>
              <li>Номер телефона</li>
              <li>Название компании (опционально)</li>
              <li>Хеш-код IP-адреса (обезличенный, для защиты от спама)</li>
              <li>Дата и время согласия на обработку данных</li>
              <li>Технические данные: User-Agent, тип браузера, язык (для аналитики)</li>
            </ul>
          </section>

          {/* 3. Цели обработки данных */}
          <section>
            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">3. Цели обработки данных</h2>
            <p>Персональные данные обрабатываются исключительно для следующих целей:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Связь с пользователем для проведения бесплатной экспресс-консультации</li>
              <li>Регистрация участия в бизнес-экспедициях и информирование о программах</li>
              <li>Защита форм Сайта от автоматизированного спама и ботов</li>
              <li>Внутренняя аналитика и улучшение пользовательского опыта</li>
              <li>Исполнение договорных обязательств при участии в экспедициях</li>
            </ul>
          </section>

          {/* 4. Права пользователя */}
          <section>
            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">4. Права пользователя</h2>
            <p>Пользователь вправе:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Получать информацию об обработке своих персональных данных</li>
              <li>Требовать уточнения, блокирования или уничтожения данных</li>
              <li>Отказаться от получения информационных рассылок</li>
              <li>Отозвать ранее данное согласие на обработку данных</li>
              <li>Обжаловать действия Оператора в уполномоченные органы (Роскомнадзор)</li>
            </ul>
          </section>

          {/* 5. Порядок отзыва согласия */}
          <section>
            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">5. Порядок отзыва согласия</h2>
            <p>
              Пользователь может отозвать согласие на обработку персональных данных в любой момент, направив письменное или электронное заявление на адрес:{' '}
              <a href="mailto:FExperience@forbes.ru" className="text-[#F7931A] hover:underline transition-colors">FExperience@forbes.ru</a>.
            </p>
            <p className="mt-2">
              Оператор обязуется прекратить обработку и уничтожить персональные данные в срок не позднее 30 дней с момента получения отзыва, за исключением случаев, когда обработка необходима для исполнения договора или предусмотрена законодательством РФ.
            </p>
          </section>

          {/* 6. Срок хранения и защита данных */}
          <section>
            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">6. Срок хранения и защита данных</h2>
            <p>
              Персональные данные хранятся не дольше, чем этого требуют цели обработки, но не более 1 (одного) года с момента последнего взаимодействия, если иное не предусмотрено законодательством. Оператор применяет организационные и технические меры, включая шифрование, ограничение доступа и регулярные аудиты, для защиты данных от несанкционированного доступа, утраты или изменения.
            </p>
          </section>

          {/* 7. Контактные данные оператора */}
          <section>
            <h2 className="text-xl md:text-2xl font-medium text-white mb-4">7. Контактные данные оператора</h2>
            <div className="bg-[#110F0D] border border-[#2A2A2A] rounded-lg p-6 mt-2">
              <p className="text-white font-medium mb-2">АО «АС РУС МЕДИА»</p>
              <p>Юридический адрес: 123022, город Москва, 2-я Звенигородская ул., д. 13 стр 15, эт 4 пом X ком 1 </p>
              <p>Email: <a href="mailto:FExperience@forbes.ru" className="text-[#F7931A] hover:underline">FExperience@forbes.ru</a></p>
              <p>Телефон: <a href="tel:+79201949003" className="text-[#F7931A] hover:underline">+7 (920) 194-90-03</a></p>
              <p className="mt-2 text-sm text-[#666666]">Дата вступления в силу: 25.04.2026</p>
            </div>
          </section>

          {/* Футер раздела */}
          <div className="pt-8 border-t border-[#2A2A2A] text-sm text-[#666666]">
            <p>
              Продолжая использование Сайта, вы подтверждаете ознакомление с настоящей Политикой.
              Подробнее об условиях использования см.{' '}
              <Link href="/terms" className="text-[#F7931A] hover:underline transition-colors">Пользовательское соглашение</Link>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}