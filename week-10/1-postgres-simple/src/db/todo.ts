import { client } from "../index";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(
  userId: number,
  title: string,
  description: string
) {
  try {
    const insertQuery =
      "INSERT INTO todos (user_id, title, description) VALUES($1, $2, $3)";
    const values = [userId, title, description];
    await client.query(insertQuery, values);

    const serarchTodo = "SELECT * FROM todos WHERE user_id = $1";
    const result = await client.query(serarchTodo, [userId]);

    if (result.rows.length > 0) return result.rows[0];
    else return null;
  } catch (error) {
    console.error(error);
  }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
  try {
    const updateQuery = "UPDATE todos SET done = true WHERE id = $1";
    await client.query(updateQuery, [todoId]);

    const searchTodo = "SELECT * FROM todos WHERE id = $1";
    const result = await client.query(searchTodo, [todoId]);

    if (result.rows.length > 0) return result.rows[0];
    else return null;
  } catch (error) {
    console.error(error);
  }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
  try {
    const searchTodos = "SELECT * FROM todos WHERE user_id = $1";
    const result = await client.query(searchTodos, [userId]);

    if (result.rows.length > 0) return result.rows;
    else return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
