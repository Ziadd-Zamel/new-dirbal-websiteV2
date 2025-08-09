declare type SubCategory = {
  id: number;
  uuid: string;
  name: string;
  description: string;
  category_uuid: string | null;
  sub_title: string;
  light: boolean;
  subSubCategory: subSubCategory[];
  image_url: string;
  icon_url: string;
  category: {
    id: number;
    name: string;
    uuid: string;
  } | null;
  status: boolean;
  created_at: string;
  updated_at: string;
};
declare type subSubCategory = {
  id: number;
  uuid: string;
  sub_category_id: number;
  name: string;
  slug: string;
  status: boolean;
  created_at: string;
  updated_at: string;
};
