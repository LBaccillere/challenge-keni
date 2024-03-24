export class ApiError extends Error {
  statusCode: number;
  originalError: Error;
  constructor(statusCode: number, message: string, originalError?: Error) {
    super(message);
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}
