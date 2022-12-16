import { Module } from '@nestjs/common';
import { FarmsModule } from './farms/farms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeORMConfig } from './configs/typeorm.config';
import { ThemesModule } from './themes/themes.module';
import { OptionsModule } from './options/options.module';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        typeORMConfig(configService),
      inject: [ConfigService],
    }),
    FarmsModule,
    ThemesModule,
    OptionsModule,
  ],
})
export class AppModule {}
