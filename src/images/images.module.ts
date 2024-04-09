import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Image, ImageSchema } from "./schemas/image.schema";
import { ImagesController } from "./images.controller";
import { ImagesService } from "./images.service";
import { ImagesRepository } from "./images.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService, ImagesRepository],
  exports: [],
})
export class ImagesModule {}
