import { MediaChannel } from '@/types/media';
export const mediaChannels: MediaChannel[] = [
  {
    id: 1,
    name: 'Журнал',
    description: 'Специальная секция FExperience. Охват: более 1 млн читателей',
    image: '/images/media/zhyrnal.png',
    stats: '1 млн+ читателей',
  },
  {
    id: 2,
    name: 'Сайт',
    description: 'Статья по итогам экспедиции на главной странице Forbes. Аудитория сайта: более 10 млн читателей / мес',
    image: '/images/media/laptop.png',
    stats: '10 млн+ читателей/мес',
  },
  {
    id: 3,
    name: 'Видео',
    description: 'Специальный видеоматериал по итогам экспедиции. Охват: более 100 тыс. просмотров',
    image: '/images/media/videoPlay.png',
    stats: '100 тыс+ просмотров',
  },
] as const;