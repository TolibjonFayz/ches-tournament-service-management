import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'adamme@gmail.com', description: 'Email of user' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'qwerty', description: 'Password of user' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
