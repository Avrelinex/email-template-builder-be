import { Injectable } from "@nestjs/common";

import { CreateTemplateDto } from "./dto/create-template.dto";
import { UpdateTemplateDto } from "./dto/update-template.dto";
import { TemplatesRepository } from "./templates.repository";
import { Template } from "./schemas/template.schema";

@Injectable()
export class TemplatesService {
  constructor(private readonly templatesRepository: TemplatesRepository) {}

  create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    return this.templatesRepository.create(createTemplateDto);
  }

  findAll(): Promise<Template[]> {
    return this.templatesRepository.findAll();
  }

  findOne(id: string): Promise<Template | null> {
    return this.templatesRepository.findById(id);
  }

  update(
    id: string,
    updateTemplateDto: UpdateTemplateDto
  ): Promise<Template | null> {
    return this.templatesRepository.updateById(id, updateTemplateDto);
  }

  remove(id: string): Promise<Template | null> {
    return this.templatesRepository.remove(id);
  }
}
