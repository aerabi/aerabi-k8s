export function fail(reason = 'fail was called in a test.') {
  throw new Error(reason);
}

describe('TestUtil', () => {
  it('should fail', () => {
    expect(fail).toThrow();
  });
});
