import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { TemplatesModule } from "./templates/templates.module";
import { DatabaseModule } from "./database/database.module";
import { ImagesModule } from "./images/images.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TemplatesModule,
    ImagesModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
