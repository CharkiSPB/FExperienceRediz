// 🔹 РЕДАКТИРУЙТЕ ЗДЕСЬ — добавляйте/удаляйте участников команды
export type TeamMember = {
  name: string;        // Имя и фамилия (отображается оранжевым)
  photo: string;       // Путь к фото (например '/images/team/nicitinaA.jpg')
  description: string; // Должность / роль (под первой линией)
  bio?: string;        // Биография / подробное описание (под второй линией) — опционально
};

export const teamMembers: TeamMember[] = [
  
  {
    name: 'Марина Матыцина',
    photo: '/images/team/marinaM.jpeg',
    description: 'Генеральный директор Forbes Russia',
  },
  {
    name: 'Денис Кошкин',
    photo: '/images/team/koshkinD1.webp',
    description: 'Исполнительный директор Forbes Russia',
  },
  {
    name: 'Анастасия Никитина',
    photo: '/images/team/nicitinaA.jpg',
    description: 'Директор по устойчивому развитию и международным проектам Forbes Russia',
  },
];
