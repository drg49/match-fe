import { handleResponse } from "../utils/helperMethods";
const root = process.env.REACT_APP_API_ROOT_URL + '/authentication';

export const login = async (formData) => handleResponse(
  await fetch(`${root}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify(formData)
  })
);

export const register = async (formData) => handleResponse(
  await fetch(`${root}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify(formData)
  })
);

export const logout = async () => handleResponse(
  await fetch(`${root}/logout`, {
    method: "POST",
    credentials: 'include'
  })
).then(() => window.location.reload());

export const validateUser = async () => handleResponse(
  await fetch(`${root}/validate-user`, {
    method: "GET",
    credentials: 'include'
  })
);
