import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';

@Entity() // sql table === 'student'
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  promotion: string;

  @JoinTable()
  @ManyToMany((type) => Course, (course) => course.students, {
    cascade: true,
  })
  courses: Course[];
}
