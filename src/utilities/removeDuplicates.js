export const removeDuplicates = (files) => {
  return [...new Set(files.map((item) => item.file.name))].map((name) => {
    return files.find((item) => item.file.name === name);
  });
};
