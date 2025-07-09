export interface ErrorResponse {
  message?: string
  errors?: Record<string, string[]>
  data?:Record<string, string[]>
}