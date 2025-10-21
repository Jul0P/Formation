import dotenv from 'dotenv';
import { Pool, QueryResult } from 'pg';

dotenv.config();

const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;

class Database {
  private pool: Pool;
  private static instance: Database;

  private constructor() {
    this.pool = new Pool({
      user: DB_USER,
      host: DB_HOST,
      database: DB_NAME,
      password: DB_PASSWORD,
      port: Number(DB_PORT),
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      await this.pool.connect();
      console.log('Connecté à la base de données PostgreSQL');
    } catch (error) {
      console.error('Erreur de connexion à la base de données :', error);
      throw error;
    }
  }

  public async query(sql: string, params?: any[]): Promise<QueryResult> {
    try {
      return await this.pool.query(sql, params);
    } catch (error) {
      console.error('Erreur de requête :', error);
      throw error;
    }
  }

  public async getOne(sql: string, params?: any[]): Promise<any> {
    const result = await this.query(sql, params);
    return result.rows.length > 0 ? result.rows[0] : null;
  }
}

export default Database.getInstance();
