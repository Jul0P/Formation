import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const { MONGO_URI } = process.env;

class MongoDatabase {
  private static instance: MongoDatabase;

  private constructor() {}

  public static getInstance(): MongoDatabase {
    if (!MongoDatabase.instance) {
      MongoDatabase.instance = new MongoDatabase();
    }
    return MongoDatabase.instance;
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

  public getConnectionStatus(): boolean {
    return mongoose.connection.readyState === 1;
  }
}

export default MongoDatabase;
