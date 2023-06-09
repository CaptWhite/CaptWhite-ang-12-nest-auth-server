import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Heroe extends Document{

    _id?: string;

    @Prop({ unique: true, required: true, index: true })
    id: string;

    @Prop({ unique: true, required: true, index: true })
    superhero: string;

    @Prop({ minlength: 3, required: true })
    publisher: string;

    @Prop({ minlength: 3, required: true })
    alter_ego: string;

    @Prop({ minlength: 3, required: true })
    first_appearance: string;

    @Prop({ array: true})
    characters: string[];

    @Prop()
    alt_img: string;
} 

export const HeroeSchema = SchemaFactory.createForClass( Heroe );
