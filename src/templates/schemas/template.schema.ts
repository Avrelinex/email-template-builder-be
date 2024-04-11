import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TemplateDocument = HydratedDocument<Template>;

@Schema({
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;
    },
  },
})
export class Template {
  @Prop()
  name: string;

  @Prop()
  body: string;

  @Prop()
  state: string;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
