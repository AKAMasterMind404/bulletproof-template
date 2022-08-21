import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
  const envFound = dotenv.config();
  if (envFound.error) {
    // This error should crash whole processs
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
  }
}

export default {
  port: parseInt(process.env.PORT, 10),

  databaseURL: process.env.MONGODB_URI,
  progressToken: process.env.PROGRESS_TOKEN,

  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,

  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  aws: {
    accessKey: process.env.AWSAccessKeyId,
    secretKey: process.env.AWSSecretKey,
    baseBucket: 'wjsites',
    region: 'us-west-1',
    epUrl: 'https://s3.us-west-1.wasabisys.com'
  },

  api: {
    prefix: '',
  },

};
