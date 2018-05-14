import merge from 'lodash/merge';

// Các setting mặc định dùng cho tất cả các môi trường
const defaultConfig = {
  env: process.env.NODE_ENV,
  get envs() {
    return {
      development: process.env.NODE_ENV === 'development',
      production: process.env.NODE_ENV === 'production',
    };
  },

  version: require('../../package.json').version,
  port: process.env.PORT || 4567,
  ip: process.env.IP || '0.0.0.0',
  apiPrefix: '', // Có thể là 'api', 'api/v2' ...

  /**
   * Cấu hình bảo mật liên quan đến session, authendication và mã hóa
   */
  security: {
    sessionSecret: process.env.SESSION_SECRET || 'i-am-the-secret-key',
    sessionExpiration: process.env.SESSION_EXPIRATION || 60 * 60 * 24 * 7, // 1 week
    saltRounds: process.env.SALT_ROUNDS || 12,
  },
};

// Setting cho các môi trường cụ thể
const environmentConfigs = {
  development: { // môi trường dev
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://localhost/fbooking',
    },
    security: {
      saltRounds: 4,
    },
  },
  production: { // môi trường product
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://localhost/fbooking',
    },
  },
};

// Merge các setting
export default merge(defaultConfig, environmentConfigs[process.env.NODE_ENV] || {});
