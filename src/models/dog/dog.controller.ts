import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { DogService } from './dog.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('dog')
export class DogController {
  constructor(private readonly dogService: DogService) {}

  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogService.create(createDogDto);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.dogService.findAll(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    return this.dogService.update(+id, updateDogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dogService.remove(+id);
  }
}
