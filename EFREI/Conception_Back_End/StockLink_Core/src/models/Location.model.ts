import { ILocation } from '@/types/location.types.';
import mongoose, { Schema } from 'mongoose';

const LocationSchema = new Schema<ILocation>({
  warehouse_id: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  layout: [
    {
      aisle: {
        type: String,
        required: true,
      },
      racks: [
        {
          rack: {
            type: String,
            required: true,
          },
          levels: [
            {
              level: {
                type: Number,
                required: true,
              },
              bins: [
                {
                  type: String,
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

export const LocationModel = mongoose.model<ILocation>('Location', LocationSchema);
