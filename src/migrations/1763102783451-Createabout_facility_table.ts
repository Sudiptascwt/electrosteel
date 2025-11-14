import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateaboutFacilityTable1763102783451 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
        name: 'about_facility',
        columns: [
            {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            },
            {
            name: 'meta_key',
            type: 'longtext',
            isNullable: false,
            },
            {
            name: 'meta_value',
            type: 'longtext',
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
        await queryRunner.dropTable('about_facility');
    }

}
