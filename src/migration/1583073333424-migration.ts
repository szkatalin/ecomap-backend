import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1583073333424 implements MigrationInterface {
    name = 'migration1583073333424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "place_category_enum" AS ENUM('OTHER', 'ZERO_WASTE_SHOP', 'WATER_REFILL_POINT')`, undefined);
        await queryRunner.query(`CREATE TABLE "place" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "addressId" integer NOT NULL, "description" character varying NOT NULL, "category" "place_category_enum" NOT NULL DEFAULT 'OTHER', CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "country" character varying NOT NULL, "postalCode" integer NOT NULL, "city" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "place_status" ("id" SERIAL NOT NULL, CONSTRAINT "PK_0dc1d0251a7d430c9899d169c2a" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "place_status"`, undefined);
        await queryRunner.query(`DROP TABLE "address"`, undefined);
        await queryRunner.query(`DROP TABLE "place"`, undefined);
        await queryRunner.query(`DROP TYPE "place_category_enum"`, undefined);
    }

}
