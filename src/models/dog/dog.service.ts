import type { CreateDogDto } from './dto/create-dog.dto';
import type { UpdateDogDto } from './dto/update-dog.dto';

import { HttpStatus, Injectable } from '@nestjs/common';
import type { Response } from 'express';

@Injectable()
export class DogService {
  create(createDogDto: CreateDogDto) {
    return 'This action adds a new dog';
  }

  findAll(res: Response) {
    // return `This action returns all dog`;
    res.status(HttpStatus.OK).json([]);
  }

  findOne(id: number) {
    return `This action returns a #${id} dog`;
  }

  update(id: number, updateDogDto: UpdateDogDto) {
    return `This action updates a #${id} dog`;
  }

  remove(id: number) {
    return `This action removes a #${id} dog`;
  }
}
