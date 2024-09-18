export const queries = {
  insertUser:
    "INSERT INTO auth (email, password) VALUES ($1, $2) RETURNING uuid, email",
  getUserByEmail: "SELECT email FROM auth WHERE email = $1",
};
