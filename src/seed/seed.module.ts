import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { HeroeModule } from '../heroe/heroe.module'

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [HeroeModule]
})
export class SeedModule {}
