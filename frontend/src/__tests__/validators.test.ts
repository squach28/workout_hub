import { UserSignUpData } from "../types/UserSignUpData";
import {
  doPasswordsMatch,
  isEmailValid,
  isEmpty,
  validateUserSignUpData,
} from "../utils/validators";
import { describe, expect, it } from "vitest";

describe("testing functions in validators", () => {
  describe("isEmpty", () => {
    describe("given empty string", () => {
      it("should return true", () => {
        const empty = "";
        const result = isEmpty(empty);
        expect(result).toBe(true);
      });
    });
    describe("given non-empty string", () => {
      it("should return false", () => {
        const nonEmpty = "sampletext";
        const result = isEmpty(nonEmpty);
        expect(result).toBe(false);
      });
    });
  });
  describe("doPasswordsMatch", () => {
    describe("given matching passwords", () => {
      it("should return true", () => {
        const password1 = "samplePassword";
        const password2 = "samplePassword";
        const result = doPasswordsMatch(password1, password2);
        expect(result).toBe(true);
      });
    });
    describe("given mismatching passwords", () => {
      it("should return false", () => {
        const password1 = "samplePassword123";
        const password2 = "samplePassword456";
        const result = doPasswordsMatch(password1, password2);
        expect(result).toBe(false);
      });
    });
  });
  describe("isEmailValid", () => {
    describe("given valid email", () => {
      it("should return true", () => {
        const validEmail = "bob@gmail.com";
        const result = isEmailValid(validEmail);
        expect(result).toBe(true);
      });
    });
    describe("given invalid email without @ symbol", () => {
      it("should return false", () => {
        const withoutSymbol = "plainaddress";
        const result = isEmailValid(withoutSymbol);
        expect(result).toBe(false);
      });
    });
    describe("given invalid email without local part", () => {
      it("should return false", () => {
        const withoutLocal = "@example.com";
        const result = isEmailValid(withoutLocal);
        expect(result).toBe(false);
      });
    });
    describe("given invalid email without domain name", () => {
      it("should return false", () => {
        const withoutDomainName = "user@.com";
        const result = isEmailValid(withoutDomainName);
        expect(result).toBe(false);
      });
    });
    describe("given invalid email without top level domain", () => {
      it("should return false", () => {
        const withoutTopLevelDomain = "user@com";
        const result = isEmailValid(withoutTopLevelDomain);
        expect(result).toBe(false);
      });
    });
  });
  describe("validateUserSignUpData", () => {
    describe("given valid values for all fields", () => {
      it("should return error object with empty values", () => {
        const validUserData: UserSignUpData = {
          firstName: "Bob",
          lastName: "Jones",
          email: "bob@gmail.com",
          password: "password123",
          confirmPassword: "password123",
        };
        const result = validateUserSignUpData(validUserData);
        let name: keyof typeof validUserData;
        for (name in validUserData) {
          expect(result[name]).toBe("");
        }
      });
    });
    describe("given empty fields for userSignUpData", () => {
      it("should return error object with all fields filled", () => {
        const emptyUserData: UserSignUpData = {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        };
        const emptyFieldMessage = "Field cannot be empty";
        const result = validateUserSignUpData(emptyUserData);
        let name: keyof typeof emptyUserData;
        for (name in emptyUserData) {
          expect(result[name]).toBe(emptyFieldMessage);
        }
      });
    });
    describe("given user data with invalid email", () => {
      it("should return error object with a value in email field", () => {
        const invalidEmailUser: UserSignUpData = {
          firstName: "Bob",
          lastName: "Jones",
          email: "@gmail.com",
          password: "password123",
          confirmPassword: "password123",
        };
        const invalidEmailMessage = "Email is not valid";
        const result = validateUserSignUpData(invalidEmailUser);
        expect(result.email).toBe(invalidEmailMessage);
      });
    });
    describe("given user data with password that is less than 6 chars", () => {
      it("should return error object with a value in password field", () => {
        const passwordTooShortUser: UserSignUpData = {
          firstName: "Bob",
          lastName: "Jones",
          email: "bob@gmail.com",
          password: "pass",
          confirmPassword: "pass",
        };
        const invalidPasswordMessage = "Password must be at least 6 characters";
        const result = validateUserSignUpData(passwordTooShortUser);
        expect(result.password).toBe(invalidPasswordMessage);
      });
    });
    describe("given user data with mismatching passwords", () => {
      it("should return error object with a value in confirmPassword field", () => {
        const mismatchingPasswordsUserData: UserSignUpData = {
          firstName: "Bob",
          lastName: "Jones",
          email: "bob@gmail.com",
          password: "password123",
          confirmPassword: "password456",
        };
        const mismatchingPasswordsMessage = "Passwords do not match";
        const result = validateUserSignUpData(mismatchingPasswordsUserData);
        expect(result.confirmPassword).toBe(mismatchingPasswordsMessage);
      });
    });
  });
});
