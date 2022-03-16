import { Module } from '@nestjs/common';
import { HealthCheckModule } from './atoms/health-check/health-check.module';
import { VisitorModule } from './atoms/visitor/visitor.module';
import { MongooseModule } from '@nestjs/mongoose';

const isMongoCloud = !!process.env.MONGODB_CLOUD;
const mongoUrl = `mongodb${isMongoCloud ? '+srv' : ''}://${
  process.env.MONGODB_USERNAME
}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${
  process.env.MONGODB_HOST
}${isMongoCloud ? '' : ':3940'}/${process.env.MONGODB_DATABASE}`;

console.log(`Connecting to MongoDB at ${mongoUrl}`);

@Module({
  imports: [MongooseModule.forRoot(mongoUrl), HealthCheckModule, VisitorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
