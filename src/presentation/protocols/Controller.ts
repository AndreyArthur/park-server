import { HttpRequest, HttpResponse } from '@/presentation/protocols';

export interface Controller<T = any> {
  handle: (
    httpRequest: HttpRequest<T>
  ) => Promise<HttpResponse>;
}
