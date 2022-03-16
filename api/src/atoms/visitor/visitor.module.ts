import { Module } from '@nestjs/common';
import { VisitorController } from './visitor.controller';
import { VisitorService } from './visitor.service';
import { VisitorMongoModule } from './mongo/visitor.mongo.module';

@Module({
  imports: [VisitorMongoModule],
  controllers: [VisitorController],
  providers: [VisitorService],
})
export class VisitorModule {}
