import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { customerService } from "./customer.service";






@Controller('chatbox')
@ApiTags('chatbox')
export class BoxChatController {
  constructor(private readonly customerService: customerService) {}
}
