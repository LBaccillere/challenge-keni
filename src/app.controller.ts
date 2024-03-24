import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class AppController {
  @ApiOkResponse({
    description: 'Health Check',
  })
  @Get()
  health(): string {
    return;
  }
}
