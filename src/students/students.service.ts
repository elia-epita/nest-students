import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { Course } from './entities/course.entity';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { DataSource } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly dataSource: DataSource,
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { offset, limit } = paginationQueryDto;
    console.log(typeof offset);
    return this.studentRepository.find({
      relations: {
        courses: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const student = await this.studentRepository.findOne({
      where: { id: +id },
      relations: {
        courses: true,
      },
    });
    if (!student) {
      throw new NotFoundException(`Student with id #${id} does not exist`);
    }
    return student;
  }

  async create(createStudentDto: CreateStudentDto) {
    const courses = await Promise.all(
      createStudentDto.courses.map((name) => this.preloadCourses(name)),
    );
    const student = this.studentRepository.create({
      ...createStudentDto,
      courses,
    });
    return this.studentRepository.save(student);
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const courses =
      updateStudentDto.courses &&
      (await Promise.all(
        updateStudentDto.courses.map((name) => this.preloadCourses(name)),
      ));
    const student = await this.studentRepository.preload({
      id: +id,
      ...updateStudentDto,
      courses,
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

  private async preloadCourses(name: string) {
    const existingCourse = await this.courseRepository.findOne({
      where: {
        name: name,
      },
    });
    if (existingCourse) {
      return existingCourse;
    }
    return this.courseRepository.create({ name });
  }

  async recommendStudent(student: Student) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      student.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_event';
      recommendEvent.type = 'student';
      recommendEvent.payload = { studentId: student.id };

      await queryRunner.manager.save(student);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
