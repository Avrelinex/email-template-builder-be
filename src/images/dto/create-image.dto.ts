import { Allow } from "class-validator";

export class CreateImageDto {
  @Allow()
  filename: string;

  @Allow()
  displayName: string;
}
