import { doPasswordsMatch, isEmailValid, isEmpty } from "../utils/validators";
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
});
