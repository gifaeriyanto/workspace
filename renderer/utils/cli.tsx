import { exec, ExecException } from 'child_process';

export const openVSCode = (
  dir: string,
  errorCallback?: (error: ExecException) => void,
) => {
  exec(
    `"/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" ${dir}`,
    (err) => {
      if (err) {
        errorCallback(err);
      }
    },
  );
};
