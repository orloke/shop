import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeToDecimal1716666296786 implements MigrationInterface {
  name = 'ChangeToDecimal1716666296786';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "amount"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "amount" numeric(10,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PROCESSING'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'pending'`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "amount"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "amount" integer NOT NULL`,
    );
  }
}
