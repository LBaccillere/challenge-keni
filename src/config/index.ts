import * as dotenv from 'dotenv';

export default function useConfigurator() {
  dotenv.config();

  const NODE_ENV = process.env.NODE_ENV || 'dev';
  const SERVICE_PORT = process.env.SERVICE_PORT || 3001;
  const JWT_SECRET = process.env.JWT_SECRET || '';
  const UPLOADS_PATH = process.env.UPLOADS_PATH || `${__dirname}/../..`;
  const UPLOADS_PATH_DOMAIN =
    process.env.UPLOADS_PATH_DOMAIN || `http://localhost:${SERVICE_PORT}`;
  const MONGO_URI =
    process.env.MONGO_URI || 'mongodb://localhost/challenge-orders';

  return {
    NODE_ENV,
    SERVICE_PORT,
    JWT_SECRET,
    UPLOADS_PATH_DOMAIN,
    UPLOADS_PATH,
    MONGO_URI,
  };
}
