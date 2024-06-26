import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Template, TemplateSchema } from "./schemas/template.schema";
import { TemplatesController } from "./templates.controller";
import { TemplatesService } from "./templates.service";
import { TemplatesRepository } from "./templates.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Template.name, schema: TemplateSchema },
    ]),
  ],
  controllers: [TemplatesController],
  providers: [TemplatesService, TemplatesRepository],
  exports: [TemplatesService],
})
export class TemplatesModule {}
