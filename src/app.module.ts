import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './infraestructure/modules/User.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, cache: true }), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
