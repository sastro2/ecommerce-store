import {
  deleteCookie,
  getParsedCookie,
  setStringifiedCookie,
} from '../cookies.ts';

test('set, get and delete cookie', () => {
  const testCookie = {
    key: 'testCookie',
    itemId: 1,
    amount: 1,
  };

  expect(getParsedCookie(testCookie.key)).toBe(undefined);
  expect(() => setStringifiedCookie('testCookie', testCookie)).not.toThrow();
  expect(getParsedCookie(testCookie.key)).toStrictEqual(testCookie);
  expect(() => deleteCookie(testCookie.key)).not.toThrow();
  expect(getParsedCookie(testCookie.key)).toBe(undefined);
});
