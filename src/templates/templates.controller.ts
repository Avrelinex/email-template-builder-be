import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";

import { TemplatesService } from "./templates.service";
import { CreateTemplateDto } from "./dto/create-template.dto";
import { UpdateTemplateDto } from "./dto/update-template.dto";

@Controller("templates")
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(createTemplateDto);
  }

  @Get()
  findAll() {
    return this.templatesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const template = await this.templatesService.findOne(id);

    if (!template) {
      throw new NotFoundException();
    }

    return template;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateTemplateDto: UpdateTemplateDto
  ) {
    const template = await this.templatesService.update(id, updateTemplateDto);

    if (!template) {
      throw new NotFoundException();
    }

    return template;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.templatesService.remove(id);
  }
}
