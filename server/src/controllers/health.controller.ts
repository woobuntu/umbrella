import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('/')
export class HealthController {
  @Get('/health')
  @HttpCode(200)
  healthCheck() {
    return 'healthy!';
  }
}
