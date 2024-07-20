class ApiError extends Error {
  constructor(status, message = "something went wrong") {
    super(message);
    this.status = status;
    this.message = message;
  }
}
export default ApiError;
