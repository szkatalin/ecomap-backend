import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1583348170081 implements MigrationInterface {
  name = 'migration1583348170081';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "place_category_details_category_enum" AS ENUM('ZERO_WASTE_SHOP', 'WATER_REFILL', 'COMMUNITY_COMPOST', 'RECYCLE_BIN', 'HAZARDOUS_WASTE_DISPOSAL', 'OTHER')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "place_category_details_type_enum" AS ENUM('DRINKING_FOUNTAIN', 'WATER_REFILL_POINT', 'PAPER', 'PLASTIC', 'METAL', 'GREEN_WASTE', 'COLORFUL_GLASS', 'TRANSPARENT_GLASS')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "place_category_details" ("id" SERIAL NOT NULL, "category" "place_category_details_category_enum" NOT NULL, "type" "place_category_details_type_enum" array NOT NULL, CONSTRAINT "PK_c7613a7e4a95e41e4bf960a745c" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "user_role_enum" AS ENUM('ADMIN', 'MODERATOR', 'USER')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" character varying NOT NULL, "role" "user_role_enum" NOT NULL, CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "place_operational_event_type_enum" AS ENUM('RECOMMENDATION', 'MODIFY_REQUEST', 'DELETE_REQUEST', 'MODIFICATION', 'DELETION', 'ACCEPTANCE', 'DENIAL')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "place_operational_event" ("id" SERIAL NOT NULL, "dateTime" TIMESTAMP NOT NULL, "type" "place_operational_event_type_enum" NOT NULL, "comment" character varying NOT NULL, "userId" character varying, "placeId" integer, CONSTRAINT "PK_bf1a135bf15b8bb7029adcc83ff" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place" DROP COLUMN "category"`,
      undefined
    );
    await queryRunner.query(
      `DROP TYPE "public"."place_category_enum"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place" ADD CONSTRAINT "UQ_b827ce7039f2c65e99a276b09ec" UNIQUE ("addressId")`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place_operational_event" ADD CONSTRAINT "FK_fb21f4db5b533644b8f98a94ef5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place_operational_event" ADD CONSTRAINT "FK_7189b2020a7fe5b0abd5ddd089b" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place" ADD CONSTRAINT "FK_b827ce7039f2c65e99a276b09ec" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "place" DROP CONSTRAINT "FK_b827ce7039f2c65e99a276b09ec"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place_operational_event" DROP CONSTRAINT "FK_7189b2020a7fe5b0abd5ddd089b"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place_operational_event" DROP CONSTRAINT "FK_fb21f4db5b533644b8f98a94ef5"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place" DROP CONSTRAINT "UQ_b827ce7039f2c65e99a276b09ec"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "public"."place_category_enum" AS ENUM('OTHER', 'ZERO_WASTE_SHOP', 'WATER_REFILL_POINT')`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place" ADD "category" "place_category_enum" NOT NULL DEFAULT 'OTHER'`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "place_operational_event"`, undefined);
    await queryRunner.query(
      `DROP TYPE "place_operational_event_type_enum"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(`DROP TYPE "user_role_enum"`, undefined);
    await queryRunner.query(`DROP TABLE "place_category_details"`, undefined);
    await queryRunner.query(
      `DROP TYPE "place_category_details_type_enum"`,
      undefined
    );
    await queryRunner.query(
      `DROP TYPE "place_category_details_category_enum"`,
      undefined
    );
  }
}
