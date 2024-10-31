export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? 'Fail' : 'Error'; // Determines whether the error is a client-side error (fail) or a server-side error (error) based on the status code.
    this.isOperational = true; // Defaults to true for expected, operational errors
  }
}