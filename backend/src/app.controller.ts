import { Controller, Delete, Get, HostParam, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller({host: ':host'})
export class AppController {
  constructor(private readonly appService: AppService) {}
  private users: Array<string> = [];

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('times/:times')
  getBye(@Param('times') times: number): string {
    return this.appService.getBye(times);
  }

  // @Get()
  // hostname(@HostParam('host') hostname: string): string {
  //   return `This hostname is ${hostname}`;
  // }

  @Post('user/:user')
  addUser(@Param('user') user: string): void {
    console.log(user);
    this.users.push(user);
  }

  @Get('users')
  allUsers(): Array<string> {
    return this.users;
  }

  @Delete('users/delete')
  deleteUser(): void {
    this.users = [];
  }

  @Get('async')
  async findAll(): Promise<string> {
    return `Async: ${this.users}`;
  }

  @Get('movies')
  @UseGuards(JwtAuthGuard)
  findAllMovies() {
    return "This returns all movies - Protected route";
  }
}
