import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getBye(times: number): string {
    console.log(times);
    return `Good Bye! ${times} times`;
  }
}
