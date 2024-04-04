import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { TemplatesModule } from "./templates/templates.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TemplatesModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
