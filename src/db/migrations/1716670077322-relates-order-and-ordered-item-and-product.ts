import { MigrationInterface, QueryRunner } from "typeorm";

export class RelatesOrderAndOrderedItemAndProduct1716670077322 implements MigrationInterface {
    name = 'RelatesOrderAndOrderedItemAndProduct1716670077322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_items" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "orders_items" ADD CONSTRAINT "FK_a64e204bf61651554cedd2988f1" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_items" DROP CONSTRAINT "FK_a64e204bf61651554cedd2988f1"`);
        await queryRunner.query(`ALTER TABLE "orders_items" DROP COLUMN "productId"`);
    }

}
