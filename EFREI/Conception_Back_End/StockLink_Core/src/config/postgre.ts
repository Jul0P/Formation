import dotenv from 'dotenv';
import { Pool, QueryResult } from 'pg';

dotenv.config();

const { PG_USER, PG_HOST, PG_NAME, PG_PASSWORD, PG_PORT } = process.env;

class PostgreDatabase {
  private pool: Pool;
  private static instance: PostgreDatabase;

  private constructor() {
    this.pool = new Pool({
      user: PG_USER,
      host: PG_HOST,
      database: PG_NAME,
      password: PG_PASSWORD,
      port: Number(PG_PORT),
    });
  }

  public static getInstance(): PostgreDatabase {
    if (!PostgreDatabase.instance) {
      PostgreDatabase.instance = new PostgreDatabase();
    }
    return PostgreDatabase.instance;
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

  public getConnectionStatus(): boolean {
    return this.pool.totalCount > 0;
  }
}

export default PostgreDatabase;
