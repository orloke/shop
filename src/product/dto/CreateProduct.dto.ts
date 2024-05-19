import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductEntity } from '../product.entity';

export class InfoProductDTO {
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
  description: string;

  product: ProductEntity;
}

export class ImageProductDTO {
  id: string;

  @IsUrl(undefined, { message: 'URL da imagem inválida' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  description: string;

  product: ProductEntity;
}

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
  name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'O value precisa ser maior que zero' })
  value: number;

  @IsNumber()
  @Min(0, { message: 'quantity mínima inválida' })
  quantityAvailable: number;

  @IsString()
  @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia ' })
  @MaxLength(1000, {
    message: 'Descrição não pode ter mais que 1000 caracteres',
  })
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => InfoProductDTO)
  info: InfoProductDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImageProductDTO)
  images: ImageProductDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  categoric: string;
}
