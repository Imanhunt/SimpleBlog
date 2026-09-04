import sql from "mssql";
import { getDB } from "../config/database";

export interface Post {
  id: number;
  title: string;
  content: string;
}

// GET ALL POSTS
export const getAllPosts = async (): Promise<Post[]> => {
  const db = getDB();

  const result = await db.request().query(`
    SELECT
      Id AS id,
      Title AS title,
      Content AS content
    FROM Posts
    ORDER BY Id
  `);

  return result.recordset;
};

// CREATE POST
export const createNewPost = async (
  title: string,
  content: string
): Promise<Post> => {
  const db = getDB();

  const result = await db
    .request()
    .input("title", sql.NVarChar(200), title)
    .input("content", sql.NVarChar(sql.MAX), content)
    .query(`
      INSERT INTO Posts (Title, Content)
      OUTPUT
        INSERTED.Id AS id,
        INSERTED.Title AS title,
        INSERTED.Content AS content
      VALUES (@title, @content)
    `);

  return result.recordset[0];
};

// GET POST BY ID
export const findPostById = async (
  id: number
): Promise<Post | undefined> => {
  const db = getDB();

  const result = await db
    .request()
    .input("id", sql.Int, id)
    .query(`
      SELECT
        Id AS id,
        Title AS title,
        Content AS content
      FROM Posts
      WHERE Id = @id
    `);

  return result.recordset[0];
};

// DELETE POST
export const deletePostById = async (
  id: number
): Promise<Post | undefined> => {
  const db = getDB();

  const result = await db
    .request()
    .input("id", sql.Int, id)
    .query(`
      DELETE FROM Posts
      OUTPUT
        DELETED.Id AS id,
        DELETED.Title AS title,
        DELETED.Content AS content
      WHERE Id = @id
    `);

  return result.recordset[0];
};

// UPDATE POST
export const updatePostById = async (
  id: number,
  title: string,
  content: string
): Promise<Post | undefined> => {
  const db = getDB();

  const result = await db
    .request()
    .input("id", sql.Int, id)
    .input("title", sql.NVarChar(200), title)
    .input("content", sql.NVarChar(sql.MAX), content)
    .query(`
      UPDATE Posts
      SET
        Title = @title,
        Content = @content
      OUTPUT
        INSERTED.Id AS id,
        INSERTED.Title AS title,
        INSERTED.Content AS content
      WHERE Id = @id
    `);

  return result.recordset[0];
};