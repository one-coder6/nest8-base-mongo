import { PartialType } from '@nestjs/swagger';
import { CreateGuestLogDto } from './create-guest-log.dto';

export class UpdateGuestLogDto extends PartialType(CreateGuestLogDto) {}
