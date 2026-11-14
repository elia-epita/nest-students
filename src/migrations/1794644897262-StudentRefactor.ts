import { MigrationInterface, QueryRunner } from 'typeorm';

export class StudentRefactor1794644897262 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE student RENAME COLUMN "name" TO "title"`,
    );
  }

  // undo or rollback of any of the above changes
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE student RENAME COLUMN "title" TO "name"`,
    );
  }
}
