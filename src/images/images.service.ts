import { Injectable } from "@nestjs/common";

import { ImagesRepository } from "./images.repository";
import { Image } from "./schemas/image.schema";
import { CreateImageDto } from "./dto/create-image.dto";
import { UpdateImageDto } from "./dto/update-image.dto";

@Injectable()
export class ImagesService {
  constructor(private readonly imagesRepository: ImagesRepository) {}

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

  remove(id: string): Promise<Image | null> {
    return this.imagesRepository.remove(id);
  }
}
