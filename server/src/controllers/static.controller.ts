import { Controller, Get, Response } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Controller('/.well-known/acme-challenge')
export class StaticController {
  @Get()
  downloadAcmeChallenge(@Response() res: FastifyReply) {
    return res.download('acme-challenge');
  }
}
