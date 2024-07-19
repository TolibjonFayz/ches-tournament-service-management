import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    private readonly jwtService: JwtService,
  ) {}

  //Get all users
  async findAllUsers(): Promise<Users[]> {
    const users = await this.userModel.find({});
    return users;
  }

  async registerUser(registerUserDto: RegisterUserDto, res: Response) {
    //Does user exists already?
    const does_user_already_exists = await this.userModel.findOne({
      email: registerUserDto.email,
    });

    if (does_user_already_exists)
      throw new BadRequestException('This user alredy exists');

    //Let's create new user
    const hashed_password = await bcrypt.hash(registerUserDto.password, 7);
    const new_user = await this.userModel.create({
      ...registerUserDto,
      password: hashed_password,
    });

    const tokens = await this.getTokens(new_user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();

    const updateAdmin = await this.userModel.updateOne(
      { email: registerUserDto.email },
      {
        $set: {
          hashed_refresh_token,
          activation_link: uniqueKey,
        },
      },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    //Return data to Front
    const userData = await this.userModel.findOne({
      email: registerUserDto.email,
    });

    const response = {
      message: 'User successfully registered',
      user: userData,
      tokens,
    };

    return response;
  }

  //Token generetsiya qilish
  async getTokens(user: Users) {
    const JwtPayload = {
      id: user['_id'],
      is_admin: user.is_admin,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(JwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(JwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
