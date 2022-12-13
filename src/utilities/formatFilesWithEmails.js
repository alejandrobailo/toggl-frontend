export const formatFilesWithEmails = async (files) => {
  const formattedFiles = files.map(
    (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsText(file);
        try {
          reader.onload = (e) => {
            const text = e.target.result;
            const emails = text.split(/\r?\n|\r|\n/g).reduce((acc, line) => {
              if (line.match(/.+@.+\..+/)) {
                return [...acc, line.trim()];
              }
              return acc;
            }, []);
            resolve({ file, emails });
          };
        } catch (error) {
          reject(error);
        }

        reader.onerror = function (error) {
          reject(error);
        };
      })
  );

  const result = await Promise.all(formattedFiles);
  return result;
};
