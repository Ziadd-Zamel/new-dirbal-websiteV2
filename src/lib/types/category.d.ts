declare type Category = {
  id: number;
  uuid: string;
  name: string;
  dark: boolean;
  light: boolean;
  description: string;
  SubCategory: SubCategory[];
  image: string;
  image_url: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};
