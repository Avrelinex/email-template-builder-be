import { Allow } from "class-validator";

export class CreateTemplateDto {
  @Allow()
  name: string;

  @Allow()
  body: string;

  @Allow()
  state: string;
}
