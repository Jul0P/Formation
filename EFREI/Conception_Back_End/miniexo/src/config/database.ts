import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const { MONGO_URI } = process.env;

class Database {
  private static instance: Database;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(MONGO_URI!);
      console.log('Connecté à la base de données MongoDB');
    } catch (error) {
      console.error('Erreur de connexion à la base de données :', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    console.log('Déconnecté de MongoDB');
  }
}

export default Database.getInstance();
