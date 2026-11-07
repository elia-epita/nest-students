import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  private students: Student[] = [
    {
      id: 1,
      name: 'John',
      promotion: 'Fall-2026',
      courses: ['JS'],
    },
  ];

  findAll() {
    return this.students;
  }

  findOne(id: string) {
    const student = this.students.find((student) => student.id === +id);
    console.log(student);
    if (!student) {
      throw new NotFoundException(`Student with id #${id} does not exist`);
    }
    return student;
  }

  create(createStudentDto: any) {
    this.students.push(createStudentDto);
    return this.students;
  }

  update(id: string, updateStudentDto: any) {
    const existingStudent = this.findOne(id);
    if (existingStudent) {
      // update ...
    }
  }

  remove(id: string) {
    const studentIndex = this.students.findIndex(
      (student) => student.id === +id,
    );
    console.log(studentIndex);
    if (studentIndex >= 0) {
      this.students.splice(studentIndex, 1);
    }
  }
}
