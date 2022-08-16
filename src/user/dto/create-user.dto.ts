import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(1, { message: 'El campo name no puede ser un string vacio.' })
  public name: string;
  @ApiProperty()
  @IsString()
  @MinLength(1, { message: 'El campo lastname no puede ser un string vacio.' })
  public lastname: string;
  @ApiProperty()
  @IsString()
  @MinLength(1, { message: 'El campo email no puede ser un string vacio.' })
  public email: string;
  @ApiProperty()
  @IsString()
  @MinLength(8, {
    message: 'El campo dni debe tener como minimo 8 caracteres.',
  })
  public dni: string;
  @ApiProperty()
  public school: string;
  @ApiProperty()
  public rol: string;
  @ApiProperty()
  public course: string;
}
