declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    SERVER_PORT: string;
    DATABASE_HOST_NAME: string;
    DATABASE_PORT: string;
    DATABASE_NAME: string;
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;
  }
}
