import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Test')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('alive')
  @ApiResponse({ status: HttpStatus.OK, description: 'The service is up' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'The service is down',
  })
  get(): string {
    return this.appService.get();
  }
}
