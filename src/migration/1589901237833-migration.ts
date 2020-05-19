import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1589901237833 implements MigrationInterface {
  name = 'migration1589901237833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "user_role_enum" AS ENUM('ADMIN', 'MODERATOR', 'USER')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" text NOT NULL, "role" "user_role_enum" NOT NULL DEFAULT 'USER', CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "operational_event_decision_enum" AS ENUM('ACCEPT', 'DECLINE')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "operational_event" ("id" SERIAL NOT NULL, "dateTime" TIMESTAMP NOT NULL, "decision" "operational_event_decision_enum" NOT NULL, "comment" character varying NOT NULL, "recommendationId" integer, "reviewerUserId" text, CONSTRAINT "REL_ce5d0e82664d7b175a1e7695c1" UNIQUE ("recommendationId"), CONSTRAINT "PK_2e66aa20488610eabf232b90c3f" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "recommendation_operationtype_enum" AS ENUM('RECOMMENDATION', 'MODIFY_REQUEST', 'DELETE_REQUEST')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "recommendation" ("id" SERIAL NOT NULL, "dateTime" TIMESTAMP NOT NULL, "comment" character varying, "operationType" "recommendation_operationtype_enum" NOT NULL, "referralUserId" text, "recommendedPlaceId" integer, "placeId" integer, CONSTRAINT "REL_dc3d62cb37b09feea7e76debe3" UNIQUE ("recommendedPlaceId"), CONSTRAINT "PK_17cb51984a6627ef2ce7370e23c" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "recommended_place" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "addressId" integer, CONSTRAINT "REL_eabd7418e862efcdcb594a6418" UNIQUE ("addressId"), CONSTRAINT "PK_34a97936948df44a907751ff23d" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "place_category_detail_category_enum" AS ENUM('ZERO_WASTE_SHOP', 'WATER_REFILL', 'COMMUNITY_COMPOST', 'RECYCLE_BIN', 'HAZARDOUS_WASTE_DISPOSAL', 'OTHER')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TYPE "place_category_detail_types_enum" AS ENUM('DRINKING_FOUNTAIN', 'WATER_REFILL_POINT', 'PAPER', 'PLASTIC', 'METAL', 'GREEN_WASTE', 'COLORFUL_GLASS', 'TRANSPARENT_GLASS')`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "place_category_detail" ("id" SERIAL NOT NULL, "category" "place_category_detail_category_enum" NOT NULL, "types" "place_category_detail_types_enum" array NOT NULL, "placeId" integer, "recommendedPlaceId" integer, CONSTRAINT "PK_82b93023e072625e2fd130a8dca" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "place" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "addressId" integer, CONSTRAINT "REL_b827ce7039f2c65e99a276b09e" UNIQUE ("addressId"), CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "postalCode" integer NOT NULL, "city" character varying NOT NULL, "streetAddress" character varying NOT NULL, "coordinates" double precision array, "recommendedPlaceId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "operational_event" ADD CONSTRAINT "FK_ce5d0e82664d7b175a1e7695c1a" FOREIGN KEY ("recommendationId") REFERENCES "recommendation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "operational_event" ADD CONSTRAINT "FK_98e8b618de9103a1de17312dbd3" FOREIGN KEY ("reviewerUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "recommendation" ADD CONSTRAINT "FK_6c323eba15a49aacbf82ef455ef" FOREIGN KEY ("referralUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "recommendation" ADD CONSTRAINT "FK_dc3d62cb37b09feea7e76debe31" FOREIGN KEY ("recommendedPlaceId") REFERENCES "recommended_place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "recommendation" ADD CONSTRAINT "FK_85bcfa74989cf2b20a851d771e6" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "recommended_place" ADD CONSTRAINT "FK_eabd7418e862efcdcb594a6418f" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place_category_detail" ADD CONSTRAINT "FK_1acd0a656fb3eff5a87fb178d32" FOREIGN KEY ("placeId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place_category_detail" ADD CONSTRAINT "FK_e9e8779498c868e11f87c89ccd8" FOREIGN KEY ("recommendedPlaceId") REFERENCES "recommended_place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place" ADD CONSTRAINT "FK_b827ce7039f2c65e99a276b09ec" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_75042c3b9697d3acc5d7035162b" FOREIGN KEY ("recommendedPlaceId") REFERENCES "recommended_place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_75042c3b9697d3acc5d7035162b"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place" DROP CONSTRAINT "FK_b827ce7039f2c65e99a276b09ec"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place_category_detail" DROP CONSTRAINT "FK_e9e8779498c868e11f87c89ccd8"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "place_category_detail" DROP CONSTRAINT "FK_1acd0a656fb3eff5a87fb178d32"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "recommended_place" DROP CONSTRAINT "FK_eabd7418e862efcdcb594a6418f"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "recommendation" DROP CONSTRAINT "FK_85bcfa74989cf2b20a851d771e6"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "recommendation" DROP CONSTRAINT "FK_dc3d62cb37b09feea7e76debe31"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "recommendation" DROP CONSTRAINT "FK_6c323eba15a49aacbf82ef455ef"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "operational_event" DROP CONSTRAINT "FK_98e8b618de9103a1de17312dbd3"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "operational_event" DROP CONSTRAINT "FK_ce5d0e82664d7b175a1e7695c1a"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "address"`, undefined);
    await queryRunner.query(`DROP TABLE "place"`, undefined);
    await queryRunner.query(`DROP TABLE "place_category_detail"`, undefined);
    await queryRunner.query(
      `DROP TYPE "place_category_detail_types_enum"`,
      undefined
    );
    await queryRunner.query(
      `DROP TYPE "place_category_detail_category_enum"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "recommended_place"`, undefined);
    await queryRunner.query(`DROP TABLE "recommendation"`, undefined);
    await queryRunner.query(
      `DROP TYPE "recommendation_operationtype_enum"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "operational_event"`, undefined);
    await queryRunner.query(
      `DROP TYPE "operational_event_decision_enum"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(`DROP TYPE "user_role_enum"`, undefined);
  }
}
