import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [HealthCheckService],
    }).compile();

    controller = app.get<HealthCheckController>(HealthCheckController);
  });

  describe('/health', () => {
    it('should return "Healthy"', () => {
      expect(controller.getHealth()).toBe('Healthy!');
    });
  });
});
