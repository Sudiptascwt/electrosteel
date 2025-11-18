import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class LifeElectrosteelContentTable1763387380701 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
        name: 'life_electrosteel_content',
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
            name: 'image',
            type: 'longtext',
            isNullable: true,
            },
            {
            name: 'image_id',
            type: 'bigint',
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
        await queryRunner.dropTable('life_electrosteel_content');
    }
}
