import { PartialType } from '@nestjs/mapped-types';
import { CreateHeroeDto } from './create-heroe.dto';

export class UpdateHeroeDto extends PartialType(CreateHeroeDto) {}
