import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsDefined()
  @IsString()
  @ApiProperty({ example: 'José' })
  name: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'jose@gmail.com' })
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(6)
  @ApiProperty({ example: '456123', minLength: 6 })
  password: string;
}
