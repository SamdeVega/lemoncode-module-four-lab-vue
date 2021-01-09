import { Login } from "../../model"

export const loginRequest = (login: Login): Promise<boolean> => {
  if (isValidLogin(login)) {
    localStorage.setItem('recipe_app_user', 'admin')
    return Promise.resolve(true)
  } else {
    return Promise.reject("Not valid login")
  }
}

const isValidLogin = (login: Login) => login.name === "admin" && login.password === "test"