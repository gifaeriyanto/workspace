export interface ErrorData {
  dir: string;
  message: string;
}

export type ImportsData = [string, number | ErrorData[]];
