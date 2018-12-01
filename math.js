
export function factory (name, deps, fn) {
  const instance = function (args) {
    return fn(deps, args, 'TEST3')
  }

  fn.factoryName = name + 'TEST4'
  return instance
}

export const hello = factory('TEST1', {}, (deps, args, message) => {
  return deps + args + message + 'TEST2'
})

export const cube = x => x * x * x
