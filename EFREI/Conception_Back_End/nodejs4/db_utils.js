import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

function getConnection() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  client.connect();
  return client;
}

const getUsers = async (callback) => {
  const client = getConnection();
  try {
    const res = await client.query('SELECT * FROM "user"');
    callback(null, res.rows);
  } catch (err) {
    callback(err, null);
  } finally {
    client.end();
  }
};

const insertUser = async (user) => {
  const client = getConnection();
  try {
    await client.query('INSERT INTO "user" (email) VALUES ($1)', [user.email]);
    console.log('Utilisateur inséré:', user.email);
  } catch (err) {
    console.error('Erreur:', err);
  } finally {
    client.end();
  }
};

// test
getUsers((err, users) => {
  if (err) {
    console.error('Erreur:', err);
  } else {
    console.log('Utilisateurs:', users);
  }
});

const newUser = {
  email: 'anonyme.anonyme@efrei.net',
};

insertUser(newUser);
