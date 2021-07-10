import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('/_check')
  getHello(): string {
    return 'Allow good!';
  }
}
