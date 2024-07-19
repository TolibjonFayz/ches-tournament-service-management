import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Get all users
  @ApiResponse({ status: 200, description: 'All users here' })
  @ApiResponse({ status: 400, description: 'Something went wrong' })
  @ApiResponse({
    status: 304,
    description: 'You can not do this action(You are not admin)',
  })
  @ApiOperation({ summary: 'Get all users' })
  @Get('all')
  async findAllUsers(): Promise<Users[]> {
    return this.usersService.findAllUsers();
  }

  @ApiOperation({ summary: 'Registering new user' })
  @ApiResponse({ status: 200, description: 'User successfully created' })
  @ApiResponse({ status: 400, description: 'Someting went wrong' })
  @Post('register')
  async registerUser(
    @Body() RegisterUserDto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.registerUser(RegisterUserDto, res);
  }
}
