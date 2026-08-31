export type Rubric = {
  id: string;
  label: string;
  icon: string; // Имя иконки из lucide-react
  href: string;
};

export const rubrics: Rubric[] = [
  { id: 'program', label: 'Программа', icon: 'CalendarDays', href: '/expeditions/[slug]/program' },
  { id: 'speakers', label: 'Эксперты', icon: 'Mic2', href: '/speakers?expedition=[slug]' },
  { id: 'video', label: 'Видео', icon: 'Play', href: 'https://youtube.com' },
] as const;