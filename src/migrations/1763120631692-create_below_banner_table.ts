import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBelowBannerTable1763120631692 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
        name: 'below_banner',
        columns: [
            {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            },
            {
            name: 'title',
            type: 'longtext',
            isNullable: false,
            },
            {
            name: 'description',
            type: 'longtext',
            isNullable: true,
            },
            {
            name: 'video',
            type: 'text',
            isNullable: true,
            },
            {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            },
            {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            },
        ],
        }),
        true
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('below_banner');
    }

}
