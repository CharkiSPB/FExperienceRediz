import nodemailer from 'nodemailer';

type LeadData = {
  formType: 'partner' | 'participant';
  expedition: string;
  phone: string;
  consent: boolean;
  fullName?: string;
  name?: string;
  position?: string;
  company?: string;
  email?: string;
};

function buildSubject(data: LeadData): string {
  if (data.formType === 'partner') {
    return `Новая заявка партнёра: ${data.fullName}`;
  }
  return `Новая заявка участника: ${data.name}`;
}

function buildHtml(data: LeadData): string {
  const rows: string[] = [];

  if (data.formType === 'partner') {
    rows.push(
      '<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Тип</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;">Партнёр</td></tr>',
      `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">ФИО</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;">${data.fullName}</td></tr>`,
      `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Должность</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${data.position}</td></tr>`,
      `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Компания</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${data.company}</td></tr>`,
    );
  } else {
    rows.push(
      '<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Тип</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;">Участник</td></tr>',
      `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Имя</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;">${data.name}</td></tr>`,
      `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${data.email}</td></tr>`,
    );
  }

  rows.push(
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Телефон</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${data.phone}</td></tr>`,
    `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;">Экспедиция</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${data.expedition}</td></tr>`,
    '<tr><td style="padding:8px 12px;color:#666;">Согласие 152-ФЗ</td><td style="padding:8px 12px;color:#22c55e;font-weight:600;">Получено</td></tr>',
  );

  return `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto;">
      <div style="background:linear-gradient(135deg,#F7931A,#E8850F);padding:20px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:20px;">${buildSubject(data)}</h1>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#f9f9f9;">
        ${rows.join('')}
      </table>
      <p style="text-align:center;color:#999;font-size:12px;margin-top:16px;">FExperience — бизнес-экспедиции</p>
    </div>
  `;
}

export async function sendLeadEmail(data: LeadData): Promise<void> {
  const { SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;

  console.log('[mail] sendLeadEmail called', {
    to: MAIL_TO,
    hasUser: !!SMTP_USER,
    hasPass: !!SMTP_PASS,
    formType: data.formType,
  });

  if (!MAIL_TO) {
    console.warn('[mail] MAIL_TO not configured, skipping email');
    return;
  }

  if (!SMTP_USER || !SMTP_PASS) {
    console.warn('[mail] SMTP credentials not configured, skipping email');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: SMTP_USER,
      to: MAIL_TO,
      subject: buildSubject(data),
      html: buildHtml(data),
    });
    console.log('[mail] Email sent successfully:', info.messageId);
  } catch (error) {
    // DNS/сетевые ошибки не должны валить деплой (например на Relax нет доступа к SMTP)
    console.warn('[mail] Failed to send email (non-fatal):', error);
  }
}
