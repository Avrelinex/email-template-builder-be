import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailGeneratorService {
  generateEmlFromHtml(html: string): string {
    return `MIME-Version: 1.0\nContent-Type: text/html; charset=utf-8\n\n${html}`;
  }
}
