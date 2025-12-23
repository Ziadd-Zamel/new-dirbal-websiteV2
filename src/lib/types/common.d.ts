declare type SearchParams = string | string[] | undefined;

declare type RouteProps = {
  params: { locale: Locale; productSlug: string };
  searchParams: SearchParams;
};

