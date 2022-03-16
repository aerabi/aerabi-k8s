import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import mongoose, { Model } from 'mongoose';
import { VisitorRepository } from '../src/atoms/visitor/visitor.repository';
import { VisitorMongoModule } from '../src/atoms/visitor/mongo/visitor.mongo.module';
import { VisitorMongoRepository } from '../src/atoms/visitor/mongo/visitor.mongo.repository';
import { VisitorDocument } from '../src/atoms/visitor/mongo/visitor.mongo.schema';

describe('VisitorController (e2e)', () => {
  let app: INestApplication;
  let model: Model<VisitorDocument>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, VisitorMongoModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const repository = moduleFixture.get<VisitorRepository>(VisitorRepository);
    model = (repository as VisitorMongoRepository).getModel();
    await app.init();
  });

  afterEach(async () => {
    await model.deleteMany({}).exec();
    await mongoose.disconnect();
  });

  it('/visitor (GET)', () => {
    return request(app.getHttpServer())
      .get('/visitor')
      .expect(200)
      .expect('[]');
  });

  it('/visitor (POST)', () => {
    const visitor = {
      name: 'John Doe',
      email: 'john@doe.com',
    };
    return request(app.getHttpServer())
      .post('/visitor')
      .send(visitor)
      .expect(201)
      .expect((response) => {
        expect(response.body).toMatchObject(visitor);
      });
  });
});
