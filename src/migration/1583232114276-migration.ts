import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1583232114276 implements MigrationInterface {
  name = "migration1583232114276";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP COLUMN "country"`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" ADD "country" character varying NOT NULL`,
      undefined
    );
  }
}
