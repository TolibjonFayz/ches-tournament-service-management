import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Adam', description: 'Name of user' })
  name: string;

  @ApiProperty({ example: 'adamme@gmail.com', description: 'Email of user' })
  email: string;

  @ApiProperty({ example: 19, description: 'Age of user' })
  age: number;

  @ApiProperty({ example: 'Germany', description: 'Living country of user' })
  country: string;
}
