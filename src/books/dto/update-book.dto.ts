import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty()
  @IsString()
  @MinLength(1, { message: 'El campo title no puede ser un string vacio.' })
  public title: string;
  @ApiProperty()
  @IsString()
  @MinLength(1, {
    message: 'El campo description no puede ser un string vacio.',
  })
  public description: string;
}
