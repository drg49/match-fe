import { notifyError } from "./toastMethods";
import { TOAST_POSITIONS } from "./constants";

const { BOTTOM_CENTER } = TOAST_POSITIONS;

// Use this validation if all fields in the form are required
export const formContainsEmptyValues = (obj) => {
  if (Object.values(obj).some(val => val === '')) {
    notifyError('Please fill out all fields before submitting the form.', BOTTOM_CENTER);
    return true;
  }
  return false;
}
