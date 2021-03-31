export const checkForSpecialCharacters = (value) => {
  return value.match(/[^a-zA-Z0-9]/g) != null;
};
export const removeSpecialCharacters = (value) => {
  return value.replace(/[^a-zA-Z0-9]/g, "");
};
