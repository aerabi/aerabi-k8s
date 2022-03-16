import { Module } from '@nestjs/common';
import { HealthCheckModule } from './atoms/health-check/health-check.module';
import { VisitorModule } from './atoms/visitor/visitor.module';
import { MongooseModule } from '@nestjs/mongoose';

const mongoUrl = `mongodb://${
  process.env.MONGODB_USERNAME
}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${
  process.env.MONGODB_HOST
}:3940/${process.env.MONGODB_DATABASE}`;

@Module({
  imports: [MongooseModule.forRoot(mongoUrl), HealthCheckModule, VisitorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
