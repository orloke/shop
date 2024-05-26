import { MigrationInterface, QueryRunner } from "typeorm";

export class ReturnAmountInOrders1716671018393 implements MigrationInterface {
    name = 'ReturnAmountInOrders1716671018393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "amount" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "amount" numeric(10,2) NOT NULL`);
    }

}
