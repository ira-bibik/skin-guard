import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorsRequestService } from './doctors-request.service';
import { CreateDoctorsRequestDto } from './dto/create-doctors-request.dto';
import { UpdateDoctorsRequestDto } from './dto/update-doctors-request.dto';

@Controller('doctors-request')
export class DoctorsRequestController {
  constructor(private readonly doctorsRequestService: DoctorsRequestService) {}

  @Post()
  create(@Body() createDoctorsRequestDto: CreateDoctorsRequestDto) {
    return this.doctorsRequestService.create(createDoctorsRequestDto);
  }

  @Get()
  findAll() {
    return this.doctorsRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorsRequestDto: UpdateDoctorsRequestDto) {
    return this.doctorsRequestService.update(+id, updateDoctorsRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsRequestService.remove(+id);
  }
}
