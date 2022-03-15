import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';

@Controller('/health')
export class HealthCheckController {
  constructor(private readonly service: HealthCheckService) {}

  @Get()
  getHealth(): string {
    return this.service.getHealth();
  }
}
