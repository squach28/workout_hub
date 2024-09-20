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
    valid: true,
  };
  let name: keyof typeof userSignUpData;
  for (name in userSignUpData) {
    if (isEmpty(userSignUpData[name])) {
      errors[name] = "Field cannot be empty";
      errors.valid = false;
    } else if (name === "email") {
      const email = userSignUpData[name];
      console.log(email);
      if (!isEmailValid(email)) {
        errors[name] = "Email is not valid";
        errors.valid = false;
        console.log("invalid");
      } else {
        errors[name] = "";
      }
    } else if (name === "password") {
      const password = userSignUpData[name];
      if (password.length < 6) {
        errors[name] = "Password must be at least 6 characters";
        errors.valid = false;
      } else {
        errors[name] = "";
      }
    } else if (name === "confirmPassword") {
      const password = userSignUpData.password;
      const confirmPassword = userSignUpData[name];
      if (!doPasswordsMatch(password, confirmPassword)) {
        errors[name] = "Passwords do not match";
        errors.valid = false;
      } else {
        errors[name] = "";
      }
    } else {
      errors[name] = "";
    }
  }
  return errors;
};
