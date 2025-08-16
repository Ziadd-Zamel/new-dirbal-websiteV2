declare type ErrorResponse = {
  success: false;
  message: string;
};

declare type SuccessfulResponse<T> = {
  success: true;
  message: string;
  data: T;
};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;

// Database base properties
declare type DataBaseProps = {
  _id?: string;
  id?: string | number;
  created_at: string;
  updated_at: string;
};

// Pagination structure matching your API
declare type PaginationMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
};

// Complete response structure matching your API
declare type ArticlesResponse = {
  success: true;
  message: string;
  data: Article[];
  pagination: PaginationMeta;
};

declare type Qabasat = {
  uuid: string;
  source: string;
  description: string;
  image: null | string;
  time: number;
  qabasat_category_uuid: null | string;
  category: {
    name: string;
    uuid: string;
  };
};
declare type QabasatResponse = {
  success: true;
  message: string;
  data: Qabasat[];
};

declare type Message = {
  email: string;
  message: string;
};
