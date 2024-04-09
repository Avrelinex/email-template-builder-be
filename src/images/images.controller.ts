import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { ImagesService } from "./images.service";
import { UpdateImageDto } from "./dto/update-image.dto";
import { FileStorageService } from "@/file-storage/file-storage.service";

@Controller("images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(":id")
  async findOne(@Res() res: Response, @Param("id") id: string) {
    const image = await this.imagesService.findOne(id);

    if (!image) {
      throw new NotFoundException();
    }

    res.sendFile(image.filename, { root: FileStorageService.imageRoot });
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateImageDto: UpdateImageDto
  ) {
    const image = await this.imagesService.update(id, updateImageDto);

    if (!image) {
      throw new NotFoundException();
    }

    return image;
  }

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", { storage: FileStorageService.storage })
  )
  uploadFile(
    @UploadedFile(FileStorageService.parseFilePipe)
    file: Express.Multer.File,
    @Body("displayName") displayName: string
  ) {
    return this.imagesService.create({
      filename: file.filename,
      displayName: displayName,
    });
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const image = await this.imagesService.remove(id);

    if (!image) {
      throw new NotFoundException();
    }

    return image;
  }
}
