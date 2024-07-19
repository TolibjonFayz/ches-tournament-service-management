import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Users>;

@Schema({ versionKey: false })
export class Users {
  @ApiProperty({ example: 'Adam', description: 'Name of user' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'adamme@gmail.com', description: 'Email of user' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: 'qwerty', description: 'Password of user' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 19, description: 'Age of user' })
  @Prop({ required: true })
  age: number;

  @ApiProperty({ example: 'Germany', description: 'Living country of user' })
  @Prop({ required: true })
  country: string;

  @ApiProperty({ example: 4.4, description: 'Rating of a user' })
  rating: number;

  @ApiProperty({ example: false, description: 'Is this admin, huh?' })
  @Prop({ default: false })
  is_admin: boolean;

  @Prop()
  hashed_refresh_token: string;

  @Prop()
  activation_link: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
