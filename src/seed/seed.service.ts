import { Injectable } from '@nestjs/common';
import { HeroeResponse } from './interfaces/heroe-response.interface'
import { InjectModel } from '@nestjs/mongoose';
import { Heroe } from 'src/heroe/entities/heroe.entity';
import { Model } from 'mongoose';
///import json from "../../data/db.json" assert { type: "json" };
import * as fs from 'fs';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Heroe.name ) 
    private readonly heroeModel: Model<Heroe>,
  ) {}

  async executeSeed() {
    
    const filePath = 'src/../data/db.json';
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const {_, heroes} = JSON.parse(jsonData);
    
    console.log(heroes)

    heroes.forEach(async heroe => {
      const {characters, ...newH} = heroe
      newH.characters = characters.split(',')
      await this.heroeModel.create( newH )
  
    });
    
    // const response = await fetch('./');
    // const body: HeroeResponse[] = await response.json();
    // console.log(body);
    return heroes;
  }
}
