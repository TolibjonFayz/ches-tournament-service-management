import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'Adam', description: 'Name of user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'adamme@gmail.com', description: 'Email of user' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'qwerty', description: 'Password of user' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 19, description: 'Age of user' })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({ example: 'Germany', description: 'Living country of user' })
  @IsNotEmpty()
  @IsString()
  country: string;
}
