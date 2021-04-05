const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
  const config = process.env.DATABASE_URL ? parse(process.env.DATABASE_URL) : {
    host: env('DATABASE_HOST', 'localhost'),
    port: env.int('DATABASE_PORT', 5432),
    database: env('DATABASE_NAME', 'strapi'),
    username: env('DATABASE_USERNAME', 'strapi'),
    password: env('DATABASE_PASSWORD', 'strapi'),
    schema: env('DATABASE_SCHEMA', 'public'),
  };

  return {
    defaultConnection: env('DATABASE_CONNECTION', 'default'),
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'sqlite',
          filename: env('DATABASE_FILENAME', '.tmp/data.db'),
        },
        options: {
          useNullAsDefault: true,
        },
      },
      pgsql: {
        connector: 'bookshelf',
        settings: {
          client: 'postgres',
          host: config.host,
          port: config.port,
          database: config.database,
          username: config.username,
          password: config.password,
          ssl: {
            rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
          },
        },
        options: {
          ssl: env.bool('DATABASE_SSL', false),
        },
      },
    },
  }
};
