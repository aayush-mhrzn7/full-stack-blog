const asyncHandler = (requestHandler) => {
  return (req, res, next) =>
    Promise.resolve(requestHandler(res, req, next)).catch((error) => {
      console.log("error in async handler", error);
    });
};
export default asyncHandler;
