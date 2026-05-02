export type ApiResponse<T> = {
  data: T;
  meta?: {
    timestamp?: string;
  };
};

export type ApiError = {
  error: {
    code: string;
    message: string;
    details?: string[];
  };
};
