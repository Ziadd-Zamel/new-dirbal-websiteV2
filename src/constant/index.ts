interface SlideData {
  content: string;
  backgroundImage: string;
}
interface Section {
  title: string;
  description: string;
  icon: string;
  route: string;
}
export const slides: SlideData[] = [
  {
    content: 'FirstSlide',
    backgroundImage: '/assets/bg-1.jpg',
  },
  {
    content: 'SecondSlide',
    backgroundImage: '/assets/bg-2.jpg',
  },
  {
    content: 'ThirdSlide',
    backgroundImage: '/assets/bg-3.jpg',
  },
  {
    content: 'ForceSlide',
    backgroundImage: '/assets/bg-4.jpg',
  },
];
// Usage example
export const alkada: Section[] = [
  {
    title: ' المحاكم الدنيا',
    description: 'القضاء المدني، الجنائي، الشرعي، النيابة العامة ',
    icon: '/assets/BookIcon.png',
    route: '/Judge',
  },
  {
    title: '   معهد القضاء',
    description: 'محاضرات، امتحانات، مشاركات',
    icon: '/assets/Islamic.png',
    route: '/maahad-al-qada',
  },
];

export const alMahkma: Section[] = [
  {
    title: 'مشروعات الأحكام',
    description: 'مشروعات محررة كانت طرحت للنقاش',
    icon: '/assets/BookIcon.png',
    route: '/highcourt',
  },
  {
    title: 'من قضاء المحكمة العليا',
    description: 'مختارات من أحكام منشورة للمحكمة العليا الليبية',
    icon: '/assets/Islamic.png',
    route: '/highcourt',
  },
  {
    title: 'شؤون فنية',
    description: 'أعمال ونشاطات داخلية',
    icon: '/assets/reashaIcon.png',
    route: '/highcourt',
  },
];
export const modawana: Section[] = [
  {
    title: ' مباحث',
    description: 'حقوق الإنسان، قانونية، متنوعة',
    icon: '/assets/BookIcon.png',
    route: '/Mabahes',
  },
  {
    title: 'كتاب ',
    description: 'كتب صوتية، قبس من كتاب',
    icon: '/assets/Islamic.png',
    route: '/Soteyat',
  },
  {
    title: ' إسلاميات',
    description: 'كتب صوتية، قبس من كتاب',
    icon: '/assets/reashaIcon.png',
    route: '/eslamyat',
  },
];
