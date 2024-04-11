import {
  Controller,
  NotFoundException,
  Param,
  Post,
  StreamableFile,
} from "@nestjs/common";
import { EmailGeneratorService } from "./email-generator.service";
import { TemplatesService } from "@/templates/templates.service";

@Controller("email-generator")
export class EmailGeneratorController {
  constructor(
    private readonly emailGeneratorService: EmailGeneratorService,
    private readonly templatesService: TemplatesService
  ) {}

  @Post("/template/:id")
  async generateEmailForTemplate(
    @Param("id") id: string
  ): Promise<StreamableFile> {
    const template = await this.templatesService.findOne(id);

    if (!template) {
      throw new NotFoundException();
    }

    const emlString = this.emailGeneratorService.generateEmlFromHtml(
      template.body
    );
    const emlBuffer = Buffer.from(emlString, "utf-8");

    return new StreamableFile(emlBuffer);
  }
}
