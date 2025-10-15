import bcrypt from 'bcrypt';
import { getConnection } from '../config/db.js';

export async function checkCredentials(email, password) {
  const client = getConnection();
  try {
    await client.connect();
    const result = await client.query('SELECT id, email, password, role FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return null;
    }

    return { id: user.id, email: user.email, role: user.role };
  } finally {
    await client.end();
  }
}

export async function newUserRegister(email, password, role = 'user') {
  const client = getConnection();
  try {
    await client.connect();

    const hashedPassword = bcrypt.hashSync(password, 10);

    await client.query('INSERT INTO users (email, password, role) VALUES ($1, $2, $3)', [email, hashedPassword, role]);
    return true;
  } catch (err) {
    return false;
  } finally {
    await client.end();
  }
}

export async function addAuthenticatedUser(token, userId) {
  const client = getConnection();
  try {
    await client.connect();
    await client.query('INSERT INTO sessions (token, user_id) VALUES ($1, $2)', [token, userId]);
  } finally {
    await client.end();
  }
}

export async function isTokenValid(token) {
  const client = getConnection();
  try {
    await client.connect();
    const result = await client.query('SELECT user_id FROM sessions WHERE token = $1', [token]);
    return result.rows.length > 0;
  } finally {
    await client.end();
  }
}

export async function getUserRole(token) {
  const client = getConnection();
  try {
    await client.connect();
    const result = await client.query(`SELECT u.role FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.token = $1`, [token]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0].role;
  } finally {
    await client.end();
  }
}
