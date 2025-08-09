declare type Subject = {
  id: number;
  uuid: string;
  title: string;
  description: string;
  order: number;
};

declare type Article = {
  id: number;
  uuid: string;
  title: string;
  title_number: string;
  title_short: string;
  sub_title: string;
  title_description: string;
  description: string;
  published_at: string;
  light: boolean;
  image: string;
  image_url: string;
  video_url: string | null;
  written_by: string;
  sub_category_id: number;
  best: boolean;
  is_best: boolean;
  sub_category: {
    id: number;
    name: string;
    uuid: string;
    category: Category;
    icon_url: string;
  };
  subjects: Subject[];
  status: boolean;
  created_at: string;
  updated_at: string;
  video_url: string | null;
};
