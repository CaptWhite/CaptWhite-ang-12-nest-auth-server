import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeroeService } from './heroe.service';
import { CreateHeroeDto } from './dto/create-heroe.dto';
import { UpdateHeroeDto } from './dto/update-heroe.dto';

@Controller('heroe')
export class HeroeController {
  constructor(private readonly heroeService: HeroeService) {}

  @Post()
  create(@Body() createHeroeDto: CreateHeroeDto) {
    return this.heroeService.create(createHeroeDto);
  }

  @Get()
  findAll() {
    return this.heroeService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.heroeService.findOne( term );
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updateHeroeDto: UpdateHeroeDto) {
    return this.heroeService.update( term, updateHeroeDto);
  }

  @Delete(':term')
  remove(@Param('term') term: string) {
    return this.heroeService.remove( term );
  }
}
