export interface PackageJson {
  dir?: string;
  name?: string;
  version?: string;
  description?: string;
  author?: string;
  license?: string;
  repository?: {
    type?: string;
    url?: string;
  };
  homepage?: string;
  scripts?: {
    [key: string]: string;
  };
  dependencies?: {
    [key: string]: string;
  };
  devDependencies?: {
    [key: string]: string;
  };
  peerDependencies?: {
    [key: string]: string;
  };
}
