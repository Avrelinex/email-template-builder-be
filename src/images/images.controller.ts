import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { diskStorage } from "multer";
import * as path from "path";
import { ImagesService } from "./images.service";
import { UpdateImageDto } from "./dto/update-image.dto";

const imageRoot = "./uploads/images";

const storage = diskStorage({
  destination: imageRoot,
  filename: (req, file, cb) => {
    const filename =
      path.parse(file.originalname).name.replace(/\s/g, "") + Date.now();
    const extension = path.parse(file.originalname).ext;

    cb(null, `${filename}${extension}`);
  },
});

const parseFilePipe = new ParseFilePipe({
  validators: [
    new FileTypeValidator({
      fileType: /image\/(jpeg|png)/,
    }),
  ],
});

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

    res.sendFile(image.filename, { root: imageRoot });
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
  @UseInterceptors(FileInterceptor("file", { storage }))
  uploadFile(
    @UploadedFile(parseFilePipe) file: Express.Multer.File,
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
