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
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @ApiOperation({ summary: 'Get one user by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getOneUserById(id);
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

  @ApiResponse({ status: 201, description: 'Login successfully done' })
  @ApiResponse({ status: 400, description: 'Something went wrong' })
  @ApiOperation({ summary: 'Login user' })
  @Post('login')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.loginUser(loginUserDto, res);
  }

  //Only admin
  //Update user by id
  @ApiResponse({ status: 201, description: 'User info successfully updated' })
  @ApiResponse({ status: 400, description: 'Something went wrong' })
  @ApiOperation({ summary: 'Update user by id' })
  @Patch('update/:id')
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserById(id, updateUserDto);
  }

  //Only admin
  //Update user by id
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  @ApiResponse({ status: 400, description: 'Something went wrong' })
  @ApiOperation({ summary: 'Delete user by id' })
  @Delete('delete/:id')
  async deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
