import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateHeroeDto } from './dto/create-heroe.dto';
import { UpdateHeroeDto } from './dto/update-heroe.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Heroe } from './entities/heroe.entity';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class HeroeService {

  constructor(
    @InjectModel( Heroe.name ) 
    private readonly heroeModel: Model<Heroe>,
  ) {}
  
  async create(createHeroeDto: CreateHeroeDto): Promise<Heroe> {
    try {
      createHeroeDto.id = createHeroeDto.id.toLowerCase();

      const heroe = await this.heroeModel.create( createHeroeDto );
      return heroe

    } catch (error) {
      if( error.code === 11000 ) {
        throw new BadRequestException(`${ createHeroeDto.superhero } already exists!`)
      }
      throw new InternalServerErrorException('Something terribe happen!!!');
    }
  }

  findAll(): Promise<Heroe[]> {
    return this.heroeModel.find();
  }

  async findById( id: string ) {
    const heroe = await this.heroeModel.findById( id );
    return heroe.toJSON();
  }

  async findOne(term: string) {
    let heroe: Heroe
    
    // MongoID
    if ( !heroe && isValidObjectId( term ) ) {
      heroe = await this.heroeModel.findById( term );
    }
    // Id
    if ( !heroe ) {
      heroe = await this.heroeModel.findOne({ id: term.toLowerCase().trim() })
    }

    // Superheroe
    if ( !heroe ) {
      heroe = await this.heroeModel.findOne({ superhero: term.trim() })
    }

    // Notfound
    if ( !heroe ) 
      throw new NotFoundException(`Pokemon with id, superhero "${ term }" not found`);

    return heroe;
  }

  async update(term: string, updateHeroeDto: UpdateHeroeDto) {
       
    const heroe = await this.findOne( term );

    if ( updateHeroeDto.id )
    updateHeroeDto.id = updateHeroeDto.id.toLowerCase();
   
    try {
      await heroe.updateOne( updateHeroeDto );
      return { ...heroe.toJSON(), ...updateHeroeDto };
      
    } catch (error) {
      if ( error.code === 11000 ) {
        throw new BadRequestException(`Heroe exists in db ${ JSON.stringify( error.keyValue ) }`);
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
    }
  }

  async remove(id: string) {
    // if ( !isValidObjectId( id ) ) {
    //   throw new BadRequestException(`${ id } is not a valid mongo identificator`);
    // }
    const { deletedCount } = await this.heroeModel.deleteOne({ id: id });
    if ( deletedCount === 0 )
      throw new BadRequestException(`Pokemon with id "${ id }" not found`);

    return;
  }
}
