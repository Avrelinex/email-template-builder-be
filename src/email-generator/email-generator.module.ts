import { Module } from "@nestjs/common";
import { EmailGeneratorService } from "./email-generator.service";
import { EmailGeneratorController } from "./email-generator.controller";
import { TemplatesModule } from "@/templates/templates.module";

@Module({
  imports: [TemplatesModule],
  providers: [EmailGeneratorService],
  controllers: [EmailGeneratorController],
})
export class EmailGeneratorModule {}
