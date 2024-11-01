const assert = require('assert');
import { add, subtract } from '../src/main';

test('add function should return the sum of two numbers', () => {
  const result = add(2, 3);
  assert.strictEqual(result, 5);
});

test('subtract function should return the difference of two numbers', () => {
  const result = subtract(5, 3);
  assert.strictEqual(result, 2);
});
