import { generateJWT, verifyJWT } from "../middleware/jwtMiddleware";
import { JwtPayload } from "jsonwebtoken";

describe("given uuid", () => {
  it("jwt should be generated with uuid", () => {
    const uuid = "12345";
    const token = generateJWT(uuid);
    expect(token).not.toBe(null);
  });

  it("jwt can be verified after generated", () => {
    const uuid = "12345";
    const token = generateJWT(uuid);
    const decoded = verifyJWT(token) as JwtPayload;
    expect(decoded.uuid).toBe(uuid);
  });
});
