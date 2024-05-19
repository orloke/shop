import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1716142580280 implements MigrationInterface {
  name = 'CreateTables1716142580280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" RENAME COLUMN "quantity" TO "quantity_available"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" RENAME COLUMN "quantity_available" TO "quantity"`,
    );
  }
}
