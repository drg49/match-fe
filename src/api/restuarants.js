import { handleResponse } from "../utils/helperMethods";
const root = process.env.REACT_APP_API_ROOT_URL + '/restaurants';

export const getRestaurants = async () => handleResponse(
  await fetch(`${root}/`, {
    method: "GET"
  })
);