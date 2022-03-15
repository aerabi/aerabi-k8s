import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  getHealth(): string {
    return 'Healthy!';
  }
}
