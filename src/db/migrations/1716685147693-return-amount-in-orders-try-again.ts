import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReturnAmountInOrdersTryAgain1716685147693
  implements MigrationInterface
{
  name = 'ReturnAmountInOrdersTryAgain1716685147693';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "amount"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "amount" numeric(10,2) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "amount"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "amount" integer NOT NULL`,
    );
  }
}
