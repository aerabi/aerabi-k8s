import { Visitor } from '../visitor.service';
import { VisitorRepository } from '../visitor.repository';
import { tap } from 'rxjs';
import { VisitorMongoRepository } from './visitor.mongo.repository';
import { fail } from '../../../utility/test-util.spec';

describe('VisitorRepository', () => {
  let repository: VisitorRepository;

  const visitor: Visitor = {
    id: '1',
    name: 'John Doe',
    email: 'john@doe.com',
  };
  const visitorDocument = { ...visitor, _id: visitor.id };
  const visitorDocumentCursor = {
    exec: async () => visitorDocument,
  };
  const model: any = {
    create: async (visitor: Visitor) => visitorDocument,
    findById: (id: string) => visitorDocumentCursor,
    find: () => ({
      exec: async () => [visitorDocument],
    }),
    findByIdAndUpdate: (id: string, visitor: Visitor) => visitorDocumentCursor,
    findByIdAndDelete: (id: string) => visitorDocumentCursor,
  };

  beforeEach(async () => {
    repository = new VisitorMongoRepository(model);
  });

  describe('create', () => {
    it('should return a visitor', (done) => {
      repository
        .create(visitor)
        .pipe(tap((result) => expect(result).toEqual(visitor)))
        .subscribe({ complete: done, error: fail });
    });
  });

  describe('findById', () => {
    it('should return a visitor', (done) => {
      repository
        .getById(visitor.id)
        .pipe(tap((result) => expect(result).toEqual(visitor)))
        .subscribe({ complete: done, error: fail });
    });
  });

  describe('getAll', () => {
    it('should return a visitor', (done) => {
      repository
        .getAll()
        .pipe(tap((result) => expect(result).toEqual([visitor])))
        .subscribe({ complete: done, error: fail });
    });
  });

  describe('update', () => {
    it('should return a visitor', (done) => {
      const updatedVisitor = { ...visitor, name: 'Jane Doe' };
      repository
        .update(updatedVisitor)
        .pipe(tap((result) => expect(result).toEqual(visitor)))
        .subscribe({ complete: done, error: fail });
    });
  });

  describe('delete', () => {
    it('should return a visitor', (done) => {
      repository
        .delete(visitor.id)
        .pipe(tap((result) => expect(result).toEqual(visitor)))
        .subscribe({ complete: done, error: fail });
    });
  });
});
