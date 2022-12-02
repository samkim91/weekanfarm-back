import { Module } from '@nestjs/common';
import { FarmsModule } from './farms/farms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeORMConfig } from './configs/typeorm.config';

@Module({
  // imports: [TypeOrmModule.forRoot(typeORMConfig), FarmsModule],
  imports: [FarmsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
