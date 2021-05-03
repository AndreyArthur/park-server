export type HttpRequest<T = unknown> = {
  body: T;
};

export type HttpResponse<T = unknown> = {
  status: number;
  body: T;
};
