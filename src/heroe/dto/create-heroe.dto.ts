import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';



export class CreateHeroeDto {

    @IsString()
    @MinLength(3)
    id: string;

    @IsString()
    @MinLength(3)
    superhero: string;

    @IsString()
    @MinLength(3)
    publisher: string;

    @IsString()
    @MinLength(3)
    alter_ego: string;

    @IsString()
    @MinLength(3)
    first_appearance: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    characters: string[];

    @IsString()
    @IsOptional()
    alt_img: string;
}
