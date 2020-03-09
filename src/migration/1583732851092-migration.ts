import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1583732851092 implements MigrationInterface {
  name = 'migration1583732851092';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "place_category_details_category_enum" AS ENUM('ZERO_WASTE_SHOP', 'WATER_REFILL', 'COMMUNITY_COMPOST', 'RECYCLE_BIN', 'HAZARDOUS_WASTE_DISPOSAL', 'OTHER')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "place_category_details_types_enum" AS ENUM('DRINKING_FOUNTAIN', 'WATER_REFILL_POINT', 'PAPER', 'PLASTIC', 'METAL', 'GREEN_WASTE', 'COLORFUL_GLASS', 'TRANSPARENT_GLASS')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "place_category_details" ("id" SERIAL NOT NULL, "category" "place_category_details_category_enum" NOT NULL, "types" "place_category_details_types_enum" array NOT NULL, CONSTRAINT "PK_c7613a7e4a95e41e4bf960a745c" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "user_role_enum" AS ENUM('ADMIN', 'MODERATOR', 'USER')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "authId" character varying NOT NULL, "role" "user_role_enum" NOT NULL DEFAULT 'USER', CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id"), CONSTRAINT "PK_ad5ed438dadb8c8e75674d7bdd0" PRIMARY KEY ("id", "authId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "place_operational_event_operationtype_enum" AS ENUM('RECOMMENDATION', 'MODIFY_REQUEST', 'DELETE_REQUEST', 'MODIFICATION', 'DELETION', 'ACCEPTANCE', 'DENIAL')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "place_operational_event" ("id" SERIAL NOT NULL, "dateTime" TIMESTAMP NOT NULL, "operationType" "place_operational_event_operationtype_enum" NOT NULL, "comment" character varying NOT NULL, "userId" integer, "userAuthId" character varying, "placeId" integer, CONSTRAINT "PK_bf1a135bf15b8bb7029adcc83ff" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "place" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "addressId" integer, CONSTRAINT "REL_b827ce7039f2c65e99a276b09e" UNIQUE ("addressId"), CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "postalCode" integer NOT NULL, "city" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place_operational_event" ADD CONSTRAINT "FK_bdcbc83c810c4204fcc9639aff7" FOREIGN KEY ("userId", "userAuthId") REFERENCES "user"("id","authId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "place_operational_event" DROP CONSTRAINT "FK_bdcbc83c810c4204fcc9639aff7"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "address"`, undefined);
    await queryRunner.query(`DROP TABLE "place"`, undefined);
    await queryRunner.query(`DROP TABLE "place_operational_event"`, undefined);
    await queryRunner.query(
      `DROP TYPE "place_operational_event_operationtype_enum"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(`DROP TYPE "user_role_enum"`, undefined);
    await queryRunner.query(`DROP TABLE "place_category_details"`, undefined);
    await queryRunner.query(
      `DROP TYPE "place_category_details_types_enum"`,
      undefined
    );
    await queryRunner.query(
      `DROP TYPE "place_category_details_category_enum"`,
      undefined
    );
  }
}
