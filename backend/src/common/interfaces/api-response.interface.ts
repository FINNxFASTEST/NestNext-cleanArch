export interface ISuccessResponse {
  success: true;
  message?: string;
}

export interface IPaginated<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
