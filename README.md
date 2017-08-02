# promised-value

Promise a promised value which set asynchronously

## How to use

```sh
npm i promised-value --save
```

```js
async function asynchronously () {
  let value = new PromisedValue();

  setTimeout(() => value.set('yay'), 500);

  let v = await value.get();

  assert.equal(v, 'yay');
}
```

## class PromisedValue

Wrap value as promised value

## PromisedValue.set(value)

Setter of value

## PromisedValue.get(timeout = -1)

Getter of value. If timeout specified, throw timeout error when timeout
(in milliseconds) hit.
