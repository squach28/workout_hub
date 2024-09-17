export const queries = {
  insertUser:
    "INSERT INTO auth (email, password) VALUES ($1, $2) RETURNING uuid, email",
};
