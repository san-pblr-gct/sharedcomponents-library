export const isDevEnvironment = process.env.NODE_ENV === 'development';
export const isProdEnvironment = process.env.NODE_ENV === 'production';

// set DEBUG to true to enable logging at app level
export const DEBUG = false;

const config = {
  googleAuthResponseType: 'code',
  orkApiUrl: process.env.REACT_APP_OKR_API_URL,
  identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
  region: process.env.REACT_APP_REGION,
  userPoolId: process.env.REACT_APP_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
  pinPointAppId: isDevEnvironment ? '86b64689606a48f3b8fbd483a99b005d' : '86b64689606a48f3b8fbd483a99b005d',
  googleAnalytics: process.env.REACT_APP_GOOGLE_ANALYTICS,
  s3Bucket: process.env.REACT_APP_S3_BUCKET,
  cognitoDomain: process.env.REACT_APP_COGNITO_DOMAIN,
  redirectUrl: process.env.REACT_APP_REDIRECT_URL,
  signoutRedirectUrl: process.env.REACT_APP_SIGNOUT_REDIRECT_URL,
  googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  s3FileUrl: (name) => {
    return `${process.env.REACT_APP_S3_FILE_URL}${name}`;
  }
};

export default config;
