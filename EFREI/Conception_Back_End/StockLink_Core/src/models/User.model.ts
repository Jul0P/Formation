import { IUser } from '@/types/user.types';
import PostgreDatabase from '../config/postgre';

class UserModel {
  private postgreConfig: PostgreDatabase;

  constructor() {
    this.postgreConfig = PostgreDatabase.getInstance();
  }

  public async findByUsername(username: string): Promise<IUser | null> {
    try {
      const result = await this.postgreConfig.query('SELECT * FROM users WHERE username = $1', [username]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error("Erreur lors de la recherche de l'utilisateur");
    }
  }

  public async create(userData: IUser): Promise<IUser> {
    try {
      const result = await this.postgreConfig.query(
        'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role, created_at',
        [userData.username, userData.password, userData.role || 'user'],
      );
      return result.rows[0];
    } catch (error) {
      throw new Error("Erreur lors de la création de l'utilisateur");
    }
  }
}

export default UserModel;
