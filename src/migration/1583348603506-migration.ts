import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1583348603506 implements MigrationInterface {
  name = 'migration1583348603506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "place_operational_event" DROP CONSTRAINT "FK_fb21f4db5b533644b8f98a94ef5"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id")`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place_operational_event" ADD CONSTRAINT "FK_fb21f4db5b533644b8f98a94ef5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "place_operational_event" DROP CONSTRAINT "FK_fb21f4db5b533644b8f98a94ef5"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_cace4a159ff9f2512dd42373760"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place_operational_event" ADD CONSTRAINT "FK_fb21f4db5b533644b8f98a94ef5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }
}
