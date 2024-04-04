import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Template, TemplateDocument } from "./schemas/template.schema";

@Injectable()
export class TemplatesRepository {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<TemplateDocument>
  ) {}

  create(template: Template): Promise<Template> {
    const newTemplate = new this.templateModel(template);
    return newTemplate.save();
  }

  findAll(): Promise<Template[]> {
    return this.templateModel.find().exec();
  }

  findById(id: string): Promise<Template | null> {
    return this.templateModel.findById(id).exec();
  }

  updateById(
    id: string,
    template: Partial<Template>
  ): Promise<Template | null> {
    return this.templateModel
      .findByIdAndUpdate(id, template, { new: true })
      .exec();
  }

  remove(id: string): Promise<Template | null> {
    return this.templateModel.findByIdAndDelete(id).exec();
  }
}
