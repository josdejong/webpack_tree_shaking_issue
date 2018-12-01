# Webpack tree shaking issue

To generate the example bundle `index.bundle.js`, run: 

```
npm run build
```

Open the bundle. It should not contain the strings "TEST1", "TEST2", "TEST4" but it does.

In the code, only the exported function `cube` is used, 
the functions `factory` and `hello` are not used can be removed from the bundle.

# Code

```js
// index.js
import { cube } from './math'

console.log('cube(3) = ' + cube(3))
```

```js
// math.js
export function factory (name, deps, fn) {
  const instance = function (args) {
    return fn(deps, args, 'TEST3')
  }

  fn.factoryName = name + 'TEST4'
  return instance
}

export const hello = factory('TEST1', {}, () => {
  return 'TEST2'
})

export const cube = x => x * x * x
```

# Workaround

A workaround to get tree shaking working is to change:

```js
export const hello = factory('TEST1', {}, () => {
  return 'TEST2'
})
```

into:

```js
export const hello = /* #__PURE__ */ factory('TEST1', {}, () => {
  return 'TEST2'
})
```

See: https://github.com/webpack/webpack/issues/4784#issuecomment-350308570

