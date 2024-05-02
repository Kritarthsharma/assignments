import { client } from "../index";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(
  username: string,
  password: string,
  name: string
) {
  try {
    const insertQuery =
      "INSERT INTO users (username, password, name) VALUES($1, $2, $3)";
    const values = [username, password, name];
    await client.query(insertQuery, values);
  } catch (error) {
    console.error(error);
  }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
  try {
    const insertQuery = "SELECT * FROM users WHERE id = $1";
    const result = await client.query(insertQuery, [userId]);

    if (result.rows.length > 0) return result.rows[0];
    else return null;
  } catch (error) {
    console.error(error);
  }
}
