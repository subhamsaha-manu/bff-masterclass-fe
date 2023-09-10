import assignWith from 'lodash/assignWith'
import cloneDeep from 'lodash/cloneDeep'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import mergeWith from 'lodash/mergeWith'

export const createDefaultProps = <T>(
  initialProps: ((otherProps: DeepPartial<T>) => DeepPartial<T>) | DeepPartial<T>
) => {
  const defaultInitialProps =
    typeof initialProps === 'function'
      ? (initialProps as (otherProps: DeepPartial<T>) => DeepPartial<T>)
      : () => cloneDeep<DeepPartial<T>>(initialProps)
  return function defaultProps(
    otherProps = {} as DeepPartial<T>,
    { assignChildObject = false }: CustomizerOptions = {}
  ) {
    return buildProps<T>(defaultInitialProps(otherProps), otherProps, { assignChildObject })
  }
}

export const buildProps = <T>(
  defaultProps: DeepPartial<T>,
  otherProps: DeepPartial<T>,
  { assignChildObject = false }: CustomizerOptions = {}
): T => {
  return mergeWith(defaultProps, otherProps, customizer({ assignChildObject })) as T
}

const customizer =
  (options: CustomizerOptions = {}) =>
  (objValue: any, srcValue: Record<string, unknown> | undefined): any => {
    if (isArray(objValue)) {
      return srcValue
    }
    if (options.assignChildObject && isObject(srcValue)) {
      return assignWith({}, objValue, srcValue, customizer(options))
    }
    if (srcValue === undefined) {
      return undefined
    }
  }

type CustomizerOptions = {
  assignChildObject?: boolean
}
