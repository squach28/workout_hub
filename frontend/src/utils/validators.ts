import validator from "validator";
import { UserSignUpData } from "../types/UserSignUpData";

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

export const validateUserSignUpData = (userSignUpData: UserSignUpData) => {
  const errors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  let name: keyof typeof userSignUpData;
  for (name in userSignUpData) {
    if (isEmpty(userSignUpData[name])) {
      errors[name] = "Field cannot be empty";
    } else if (name === "email") {
      const email = userSignUpData[name];
      if (!isEmailValid(email)) {
        errors[name] = "Email is not valid";
      }
    } else if (name === "password") {
      const password = userSignUpData[name];
      if (password.length < 6) {
        errors[name] = "Password must be at least 6 characters";
      }
    } else if (name === "confirmPassword") {
      const password = userSignUpData.password;
      const confirmPassword = userSignUpData[name];
      if (!doPasswordsMatch(password, confirmPassword)) {
        errors[name] = "Passwords do not match";
      }
    }
  }
  return errors;
};
