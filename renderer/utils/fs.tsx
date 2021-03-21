import fs from 'fs';

export const getDirectories = (path: string) => {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory();
  });
};

export const readJSONFile = (path: string, callback: (result: any) => void) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) throw err;
    callback(JSON.parse(data));
  });
};
