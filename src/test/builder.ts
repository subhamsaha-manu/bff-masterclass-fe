import mergeWith from 'lodash/mergeWith'

export interface Builder<T> {
  build(overrides?: DeepPartial<T>): T
}

export function builder<T>(defaults: T): Builder<T> {
  return {
    build: (overrides?: DeepPartial<T>): T =>
      mergeWith({}, defaults, overrides, (objValue, srcValue) =>
        objValue instanceof Array ? srcValue : undefined
      ),
  }
}
