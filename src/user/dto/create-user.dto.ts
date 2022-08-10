import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1, { message: 'El campo name no puede ser un string vacio.' })
  public name: string;
  @IsString()
  @MinLength(1, { message: 'El campo lastname no puede ser un string vacio.' })
  public lastname: string;
  @IsString()
  @MinLength(1, { message: 'El campo email no puede ser un string vacio.' })
  public email: string;
  @IsString()
  @MinLength(8, {
    message: 'El campo dni debe tener como minimo 8 caracteres.',
  })
  public dni: string;
  /* @IsString()
  @MinLength(1, { message: 'El campo school no puede ser un string vacio.' })
  public school: string;
  @IsString()
  @MinLength(1, { message: 'El campo rol no puede ser un string vacio.' })
  public rol: string;
  @IsString()
  @MinLength(1, { message: 'El campo course no puede ser un string vacio.' })
  public course: string; */
}
