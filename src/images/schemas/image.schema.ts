import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ImageDocument = HydratedDocument<Image>;

@Schema({
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;
    },
  },
})
export class Image {
  @Prop()
  filename: string;

  @Prop()
  displayName: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
