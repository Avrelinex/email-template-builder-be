import { Injectable } from "@nestjs/common";

import { ImagesRepository } from "./images.repository";
import { Image } from "./schemas/image.schema";
import { CreateImageDto } from "./dto/create-image.dto";
import { UpdateImageDto } from "./dto/update-image.dto";
import { FileStorageService } from "@/file-storage/file-storage.service";

@Injectable()
export class ImagesService {
  constructor(
    private readonly imagesRepository: ImagesRepository,
    private readonly fileStorageService: FileStorageService
  ) {}

  create(createImageDto: CreateImageDto): Promise<Image> {
    return this.imagesRepository.create(createImageDto);
  }

  findAll(): Promise<Image[]> {
    return this.imagesRepository.findAll();
  }

  findOne(id: string): Promise<Image | null> {
    return this.imagesRepository.findById(id);
  }

  update(id: string, updateTemplateDto: UpdateImageDto): Promise<Image | null> {
    return this.imagesRepository.updateById(id, updateTemplateDto);
  }

  async remove(id: string): Promise<Image | null> {
    const image = await this.imagesRepository.findById(id);

    if (!image) {
      return null;
    }

    this.fileStorageService.deleteFile(image?.filename);

    return await this.imagesRepository.remove(id);
  }
}
