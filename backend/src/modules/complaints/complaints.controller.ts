import { Controller, Post, Body } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  create(@Body() createComplaintDto: CreateComplaintDto) {
    return this.complaintsService.create(createComplaintDto);
  }
}
