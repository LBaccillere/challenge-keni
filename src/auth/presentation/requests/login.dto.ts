import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'jose@gmail.com' })
  email: string;

  @IsDefined()
  @IsString()
  @ApiProperty({ example: '456123' })
  password: string;
}
