import { Module } from '@nestjs/common';
import { HeroeService } from './heroe.service';
import { HeroeController } from './heroe.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Heroe, HeroeSchema } from './entities/heroe.entity';


@Module({
  controllers: [HeroeController],
  providers: [HeroeService],
  imports:[
    MongooseModule.forFeature([
      {
        name: Heroe.name,
        schema: HeroeSchema
      }
    ]),
  ],
  exports: [
    MongooseModule,
    HeroeModule
  ]
})
export class HeroeModule {


}
