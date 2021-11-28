import { Controller, Get, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Controller('/toss')
export class TossController {
  @Get('/virtual-account-callback')
  virtualAccountCallback(@Req() request: FastifyRequest) {
    console.log(request);
  }
}
