import { Controller, Get, Response as NestResponse } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async index(
    @NestResponse() response: ExpressResponse,
  ): Promise<ExpressResponse> {
    response.status(301).redirect('/public');
    return;
  }
}
