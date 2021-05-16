import fs from 'fs';
import path from 'path';

export const getDirectories = (dir: string) => {
  return fs.readdirSync(dir).filter((file) => {
    return fs.statSync(dir + '/' + file).isDirectory();
  });
};

export const readJSONFile = (dir: string, callback: (result: any) => void) => {
  fs.readFile(dir, 'utf8', (err, data) => {
    if (err) throw err;
    callback(JSON.parse(data));
  });
};

export const findFilesFromDir = (
  dir: string,
  extensions: string[],
  callback?: (value: string[]) => void,
) => {
  if (!fs.existsSync(dir)) {
    return;
  }

  const result = [];
  const folderExeptions = ['node_modules', 'public', 'dist', 'coverage'];
  const files = fs.readdirSync(dir, { withFileTypes: true });
  files
    .filter((file) => {
      if (
        (file.isDirectory() && folderExeptions.includes(file.name)) ||
        file.name.charAt(0) === '.'
      ) {
        return false;
      }

      if (!file.isDirectory()) {
        const splittedName = file.name.split('.');
        const ext = splittedName[splittedName.length - 1];
        if (extensions.includes(ext)) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    })
    .forEach((file) => {
      const filename = path.join(dir, file.name);
      if (file.isDirectory()) {
        findFilesFromDir(filename, extensions, callback);
      } else {
        result.push(filename);
        if (callback) {
          callback(result);
        }
      }
    });
};
