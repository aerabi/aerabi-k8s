import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('VisitorController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/visitor (GET)', () => {
    return request(app.getHttpServer())
      .get('/visitor')
      .expect(200)
      .expect('[]');
  });

  it('/visitor (POST)', () => {
    const visitor = {
      id: '1',
      name: 'John Doe',
      email: 'john@doe.com',
    };
    return request(app.getHttpServer())
      .post('/visitor')
      .send(visitor)
      .expect(201)
      .expect(visitor);
  });
});
