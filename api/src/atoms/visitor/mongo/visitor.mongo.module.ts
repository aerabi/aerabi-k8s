import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { visitorMongoSchema, VisitorMongoSchema } from './visitor.mongo.schema';
import { VisitorMongoRepository } from './visitor.mongo.repository';
import { VisitorRepository } from '../visitor.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VisitorMongoSchema.name, schema: visitorMongoSchema },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: VisitorRepository,
      useClass: VisitorMongoRepository,
    },
  ],
  exports: [
    {
      provide: VisitorRepository,
      useClass: VisitorMongoRepository,
    },
  ],
})
export class VisitorMongoModule {}
