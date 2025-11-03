import { IAnime } from '@/types/index';
import mongoose, { Document, Schema } from 'mongoose';

export interface IAnimeModel extends IAnime, Document {}

const AnimeSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Remove whitespace from both ends
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    episodes: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ['ongoing', 'completed', 'upcoming'],
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
    year: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export const Anime = mongoose.model<IAnimeModel>('Anime', AnimeSchema);
