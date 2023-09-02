export const initMocks = () => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { worker } = require('./browser.ts')

    worker.start()
  }
}
