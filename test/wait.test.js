const assert = require('assert');
const PromisedValue = require('../');

describe('wait', () => {
  it('wait undefinitely when get without parameter', async () => {
    let value = new PromisedValue();

    setTimeout(() => value.set('yay'), 500);

    let v = await value.get();

    assert.equal(v, 'yay');
  });

  it('return immediately when value set before', async () => {
    let value = new PromisedValue();
    value.set('yay');

    let v = await value.get();

    assert.equal(v, 'yay');
  });

  it('caught timeout when timeout reached before value set', async () => {
    let value = new PromisedValue();

    setTimeout(() => value.set('yay'), 1000);

    try {
      let v = await value.get(100);

      throw new Error('Timeout error not invoked');
    } catch (err) {
      assert.equal(err.message, 'Got timeout');
    }
  });
});
