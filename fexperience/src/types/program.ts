export type ProgramDay = {
  day: number;
  title: string;
  description: string;
  image: string;
  schedule?: { time: string; event: string }[];
};