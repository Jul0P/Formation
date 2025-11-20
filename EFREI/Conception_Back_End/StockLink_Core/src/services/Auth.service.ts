import { IUser, IUserPayload } from '@/types/user.types';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.model';

dotenv.config();

class AuthService {
  private userModel: UserModel;
  private jwtSecret: string;

  constructor() {
    this.userModel = new UserModel();
    this.jwtSecret = process.env.JWT_SECRET!;
  }

  public async register(username: string, password: string, role?: 'user' | 'admin'): Promise<IUser> {
    try {
      const existingUser = await this.userModel.findByUsername(username);
      if (existingUser) {
        throw new Error("Nom d'utilisateur déjà utilisé");
      }

      const hashedPassword = await bcrypt.hash(password, 10); // on hash avec un salage de 10

      const newUser = await this.userModel.create({
        username,
        password: hashedPassword,
        role: role || 'user',
      });

      return newUser;
    } catch (error) {
      throw new Error("Erreur lors de l'inscription");
    }
  }

  public async login(username: string, password: string): Promise<string> {
    try {
      const user = await this.userModel.findByUsername(username);
      if (!user) {
        throw new Error('Identifiant invalide');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Mot de passe invalide');
      }

      const payload: IUserPayload = {
        id: user.id!,
        username: user.username,
        role: user.role,
      };

      const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '24h' });

      return token;
    } catch (error) {
      throw new Error('Erreur lors de la connexion');
    }
  }

  public verifyToken(token: string): IUserPayload {
    try {
      return jwt.verify(token, this.jwtSecret) as IUserPayload;
    } catch (error) {
      throw new Error('Token invalide ou expiré');
    }
  }
}

export default AuthService;
