export const UNAUTHORIZED_ERROR = "unauthorized";
export const NOT_FOUND_ERROR = "notFound";
export const UNEXPECTED_ERROR = "unexpectedError";

export const handleErrorStatus = (status) => {
  switch (status) {
    case 401:
      return { error: UNAUTHORIZED_ERROR };
    case 404:
      return { error: NOT_FOUND_ERROR };
    default:
      return { error: UNEXPECTED_ERROR };
  }
};
