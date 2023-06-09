import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


import { AuthModule } from './auth/auth.module';
import { HeroeModule } from './heroe/heroe.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot( process.env.MONGO_URI, {dbName: process.env.MONGO_DB_NAME} ),
    AuthModule,
    HeroeModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
