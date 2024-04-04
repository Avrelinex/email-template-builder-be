import { Injectable } from "@nestjs/common";
import { CreateTemplateDto } from "./dto/create-template.dto";
import { UpdateTemplateDto } from "./dto/update-template.dto";
import { Template } from "./entities/template.entity";

@Injectable()
export class TemplatesService {
  private templates: Template[] = [];

  create(createTemplateDto: CreateTemplateDto) {
    const id = this.templates.length + 1;

    const template = new Template();
    template.id = id;
    template.name = createTemplateDto.name;
    template.body = createTemplateDto.body;

    this.templates.push(template);

    return template;
  }

  findAll() {
    return this.templates;
  }

  findOne(id: number) {
    return this.templates.find((template) => template.id === id);
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    this.templates = this.templates.map((template) =>
      template.id === id ? { ...template, ...updateTemplateDto } : template
    );

    return this.findOne(id);
  }

  remove(id: number) {
    this.templates = this.templates.filter((template) => template.id !== id);
  }
}
