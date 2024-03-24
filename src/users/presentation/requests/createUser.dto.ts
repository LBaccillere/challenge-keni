import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
