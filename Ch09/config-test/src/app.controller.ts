/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get()
  getHello(): string {
    const message = this.configService.get('MESSAGE');
    return message;
  }

  @Get('service-url')
  getServiceUrl(): string {
    return this.configService.get('SERVICE_URL');
  }

  @Get('db-info')
  getTest(): string {
    console.log(this.configService.get('logLevel'));
    return this.configService.get('dbInfo');
  }
}
