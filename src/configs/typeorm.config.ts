import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeORMConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get('DATABASE_HOSTNAME'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    entities: ['dist/**/*.entity.js'],
    synchronize: configService.get('DATABASE_SYNCHRONIZE'),
    logging: JSON.parse(configService.get('DATABASE_LOG')!),
  };
};
