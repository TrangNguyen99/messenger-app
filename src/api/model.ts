export interface ApiResponse {
  type: 'success' | 'error';
  message: string;
  data: any;
}
