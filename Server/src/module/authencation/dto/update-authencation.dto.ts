import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthencationDto } from './create-authencation.dto';

export class UpdateAuthencationDto extends PartialType(CreateAuthencationDto) {}
