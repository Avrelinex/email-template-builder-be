import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { TemplatesModule } from "./templates/templates.module";
import { DatabaseModule } from "./database/database.module";
import { ImagesModule } from "./images/images.module";
import { FileStorageModule } from "./file-storage/file-storage.module";
import { EmailGeneratorModule } from "./email-generator/email-generator.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TemplatesModule,
    ImagesModule,
    DatabaseModule,
    FileStorageModule,
    EmailGeneratorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
