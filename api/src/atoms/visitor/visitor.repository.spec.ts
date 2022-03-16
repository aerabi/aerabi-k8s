import { Visitor } from './visitor.service';
import { IVisitorRepository } from './visitor.repository.interface';
import { tap } from 'rxjs';
import { VisitorRepository } from './visitor.repository';

describe('VisitorRepository', () => {
  let repository: IVisitorRepository;
  const model: any = {
    create: async (visitor: Visitor) => ({ ...visitor, _id: visitor.id }),
  };

  beforeEach(async () => {
    repository = new VisitorRepository(model);
  });

  describe('create', () => {
    it('should return a visitor', (done) => {
      const visitor: Visitor = {
        id: '1',
        name: 'John Doe',
        email: 'john@doe.com',
      };
      repository
        .create(visitor)
        .pipe(tap((result) => expect(result).toEqual(visitor)))
        .subscribe({ complete: done, error: done.fail });
    });
  });
});
