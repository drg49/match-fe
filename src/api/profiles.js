import { handleResponse } from '../utils/helperMethods';
const root = process.env.REACT_APP_API_ROOT_URL + '/profiles';

export const getProfiles = async () =>
  handleResponse(
    await fetch(`${root}/`, {
      method: 'GET',
    }),
  );
