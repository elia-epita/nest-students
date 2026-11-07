import { IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly promotion: string;

  @IsString({ each: true })
  readonly courses: string[];
}
