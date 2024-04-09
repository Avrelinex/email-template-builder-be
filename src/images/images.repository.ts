import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Image, ImageDocument } from "./schemas/image.schema";

@Injectable()
export class ImagesRepository {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>
  ) {}

  create(Image: Image): Promise<Image> {
    const newImage = new this.imageModel(Image);
    return newImage.save();
  }

  findAll(): Promise<Image[]> {
    return this.imageModel.find().exec();
  }

  findById(id: string): Promise<Image | null> {
    return this.imageModel.findById(id).exec();
  }

  updateById(id: string, template: Partial<Image>): Promise<Image | null> {
    return this.imageModel
      .findByIdAndUpdate(id, template, { new: true })
      .exec();
  }

  remove(id: string): Promise<Image | null> {
    return this.imageModel.findByIdAndDelete(id).exec();
  }
}
