import { Visitor, VisitorService } from './visitor.service';
import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom, tap } from 'rxjs';
import { MockVisitorRepository, VisitorRepository } from './visitor.repository';
import { fail } from '../../utility/test-util.spec';

describe('VisitorService', () => {
  let service: VisitorService;

  const visitorId = '1';
  const visitor: Visitor = {
    id: visitorId,
    name: 'John Doe',
    email: 'john@doe.com',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: VisitorRepository, useClass: MockVisitorRepository },
        VisitorService,
      ],
    }).compile();

    service = app.get<VisitorService>(VisitorService);
    await firstValueFrom(service.createVisitor(visitor));
  });

  describe('getVisitors', () => {
    it('should return an array of visitors', (done) => {
      service
        .getAllVisitors()
        .pipe(tap((visitors) => expect(visitors).toContain(visitor)))
        .subscribe({
          complete: done,
          error: fail,
        });
    });
  });

  describe('getVisitor', () => {
    it('should return a visitor', (done) => {
      service
        .getVisitor(visitorId)
        .pipe(tap((visitor) => expect(visitor).toEqual(visitor)))
        .subscribe({
          complete: done,
          error: fail,
        });
    });
  });

  describe('createVisitor', () => {
    it('should create a visitor', (done) => {
      const newVisitor: Visitor = {
        id: '2',
        name: 'Jane Doe',
        email: 'jane@doe.com',
      };
      service
        .createVisitor(newVisitor)
        .pipe(tap((jane) => expect(jane).toEqual(newVisitor)))
        .subscribe({
          complete: done,
          error: fail,
        });
    });
  });

  describe('updateVisitor', () => {
    it('should update a visitor', (done) => {
      const updatedVisitor: Visitor = {
        id: visitorId,
        name: 'Jane Doe',
        email: 'jane@doe.com',
      };
      service
        .updateVisitor(updatedVisitor)
        .pipe(tap((jane) => expect(jane).toEqual(updatedVisitor)))
        .subscribe({
          complete: done,
          error: fail,
        });
    });
  });

  describe('deleteVisitor', () => {
    it('should delete a visitor', (done) => {
      service
        .deleteVisitor(visitorId)
        .pipe(tap((visitor) => expect(visitor).toEqual(visitor)))
        .subscribe({
          complete: done,
          error: fail,
        });
    });
  });
});
