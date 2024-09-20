import validator from "validator";

export const isEmpty = (value: string) => {
  if (value === "") {
    return true;
  }
  return false;
};

export const doPasswordsMatch = (password1: string, password2: string) => {
  return password1 === password2;
};

export const isEmailValid = (value: string) => {
  return validator.isEmail(value);
};
