// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import * as config from 'config';
//
// const dbConfig = config.get('db');
//
// export const typeORMConfig: TypeOrmModuleOptions = {
//     type: dbConfig.type,
//     host: process.env.RDS_HOSTNAME || dbConfig.host,
//     port: process.env.RDS_PORT || dbConfig.port,
//     username: process.env.RDS_USERNAME || dbConfig.username,
//     password: process.env.RDS_PASSWORD || dbConfig.password,
//     database: process.env.DB_NAME || dbConfig.database,
//     entities: [__dirname + '/../**/*.entity.{js,ts}'],
//     synchronize: dbConfig.synchronize,
// };

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'process';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOSTNAME,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
};
