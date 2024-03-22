import { CreateDogDto } from './create-dog.dto';

import { PartialType } from '@nestjs/mapped-types';

export class UpdateDogDto extends PartialType(CreateDogDto) {}
