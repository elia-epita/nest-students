import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  findAll() {
    return this.studentRepository.find();
  }

  async findOne(id: string) {
    const student = await this.studentRepository.findOne({
      where: { id: +id },
    });
    if (!student) {
      throw new NotFoundException(`Student with id #${id} does not exist`);
    }
    return student;
  }

  create(createStudentDto: CreateStudentDto) {
    const student = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(student);
  }

  async update(id: string, updateStudentDto: any) {
    const student = await this.studentRepository.preload({
      id: +id,
      ...updateStudentDto,
    });

    console.log(student);
    if (!student) {
      throw new NotFoundException(`Student #${id} not found`);
    }
    return this.studentRepository.save(student);
  }

  async remove(id: string) {
    const student = await this.findOne(id);
    return this.studentRepository.remove(student);
  }
}
