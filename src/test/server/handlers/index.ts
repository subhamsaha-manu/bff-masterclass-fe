import { currentUserHandler } from './currentUser'
import { loginHandler } from './login'

export const handlers = [...loginHandler, ...currentUserHandler]
