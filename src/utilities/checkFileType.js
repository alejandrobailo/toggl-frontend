export const checkFileType = (files, types) => {
  return [...files].every((file) => file.type === types[0]);
};
