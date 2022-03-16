import { VisitorController } from './visitor.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { Visitor, VisitorService } from './visitor.service';
import { firstValueFrom, mergeMap, tap } from 'rxjs';
import { MockVisitorRepository, VisitorRepository } from './visitor.repository';
import { fail } from '../../utility/test-util.spec';

describe('VisitorController', () => {
  let controller: VisitorController;
  let service: VisitorService;

  const visitorId = '1';
  const visitor: Visitor = {
    id: visitorId,
    name: 'John Doe',
    email: 'john@doe.com',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VisitorController],
      providers: [
        { provide: VisitorRepository, useClass: MockVisitorRepository },
        VisitorService,
      ],
    }).compile();

    controller = app.get<VisitorController>(VisitorController);
    service = app.get<VisitorService>(VisitorService);

    await firstValueFrom(service.createVisitor(visitor));
  });

  describe('GET /visitor', () => {
    it('should return a list of visitors', (done) => {
      controller
        .getAllVisitors()
        .pipe(tap((visitors) => expect(visitors).toEqual([visitor])))
        .subscribe({
          complete: done,
          error: fail,
        });
    });
  });

  describe('POST /visitor', () => {
    it('should save the visitor', (done) => {
      const newVisitor: Visitor = {
        id: '2',
        name: 'Jane Doe',
        email: 'jane@doe.com',
      };
      controller
        .createVisitor(newVisitor)
        .pipe(mergeMap(() => service.getVisitor(newVisitor.id)))
        .pipe(tap((visitor) => expect(visitor).toEqual(newVisitor)))
        .subscribe({
          complete: done,
          error: fail,
        });
    });
  });
});
