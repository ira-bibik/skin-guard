import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}  

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOneByUserId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
