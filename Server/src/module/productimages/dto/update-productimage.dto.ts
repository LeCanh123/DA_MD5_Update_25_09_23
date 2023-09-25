import { PartialType } from '@nestjs/mapped-types';
import { CreateProductimageDto } from './create-productimage.dto';

export class UpdateProductimageDto extends PartialType(CreateProductimageDto) {}
