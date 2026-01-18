import { Schema, model, models, InferSchemaType, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const itemRequestSchema = new Schema(
  {
    // _id is defined by default
    requestorName: { type: String, required: true, minLength: 3, maxLength: 30 },
    itemRequested: { type: String, required: true, minLength: 2, maxLength: 100 },
    status: { type: String, required: true, default: 'pending', enum: ['pending', 'completed', 'approved', 'rejected'] }
  },
  {
    // provides createdAt and updatedAt
    timestamps: true
  }
);

itemRequestSchema.plugin(mongoosePaginate);

export type ItemRequest = InferSchemaType<typeof itemRequestSchema>;

export const ItemRequestModel =
  (models.ItemRequest as PaginateModel<ItemRequest>) ||
  model<ItemRequest, PaginateModel<ItemRequest>>('ItemRequest', itemRequestSchema, 'requests');
