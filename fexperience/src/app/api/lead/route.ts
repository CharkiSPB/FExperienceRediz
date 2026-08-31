import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendLeadEmail } from '@/lib/mail';
import { expeditions } from '@/data/expeditions';

const partnerSchema = z.object({
  formType: z.literal('partner'),
  expedition: z.string().min(1, 'Выберите экспедицию'),
  fullName: z.string().min(2, 'Минимум 2 символа'),
  position: z.string().min(2, 'Укажите должность'),
  company: z.string().min(2, 'Укажите компанию'),
  phone: z.string().min(10, 'Введите корректный телефон'),
  consent: z.boolean().refine((val) => val === true, { message: 'Необходимо согласие' }),
});

const participantSchema = z.object({
  formType: z.literal('participant'),
  expedition: z.string().min(1, 'Выберите экспедицию'),
  name: z.string().min(2, 'Минимум 2 символа'),
  phone: z.string().min(10, 'Введите корректный телефон'),
  email: z.string().email('Некорректный email'),
  consent: z.boolean().refine((val) => val === true, { message: 'Необходимо согласие' }),
});

const leadSchema = z.discriminatedUnion('formType', [partnerSchema, participantSchema]);

function buildAmoPayload(data: z.infer<typeof leadSchema>) {
  if (data.formType === 'partner') {
    return {
      add: [
        {
          name: `Партнёр: ${data.fullName}`,
          custom_fields_values: [
            { field_code: 'PHONE', values: [{ value: data.phone, enum_code: 'WORK' }] },
          ],
          tags: ['Партнёрство'],
          _embedded: {
            notes: [
              {
                note_type: 'common',
                text: `Должность: ${data.position}\nКомпания: ${data.company}\nЭкспедиция: ${data.expedition}\nСогласие 152-ФЗ: Получено`,
              },
            ],
          },
        },
      ],
    };
  }

  return {
    add: [
      {
        name: `Участник: ${data.name}`,
        custom_fields_values: [
          { field_code: 'PHONE', values: [{ value: data.phone, enum_code: 'WORK' }] },
          { field_code: 'EMAIL', values: [{ value: data.email }] },
        ],
        tags: ['Экспедиция'],
        _embedded: {
          notes: [
            {
              note_type: 'common',
              text: `Экспедиция: ${data.expedition}\nEmail: ${data.email}\nСогласие 152-ФЗ: Получено`,
            },
          ],
        },
      },
    ],
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    // Преобразуем slug (vietnam, sakhalin) в читаемое название страны (Вьетнам, Сахалин)
    const expedition = expeditions.find(e => e.slug === data.expedition);
    if (expedition) {
      data.expedition = expedition.country;
    }

    const webhookUrl = process.env.AMOCRM_WEBHOOK_URL;

    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        const payload = buildAmoPayload(data);
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          return NextResponse.json({ success: true }, { status: 200 });
        }

        const errorText = await response.text();
        console.error('AmoCRM API Error:', errorText);
      } catch (e) {
        console.warn('AmoCRM unavailable, falling back to email:', e);
      }
    }

    await sendLeadEmail(data);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Lead API Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
