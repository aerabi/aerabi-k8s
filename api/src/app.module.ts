import { Module } from '@nestjs/common';
import { HealthCheckModule } from './atoms/health-check/health-check.module';
import { VisitorModule } from './atoms/visitor/visitor.module';

@Module({
  imports: [HealthCheckModule, VisitorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
