import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDuctileironpipesapplicationsTable1759991380053 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
        name: 'ductile_iron_pipes_applications',
        columns: [
            {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            },
            {
            name: 'features',
            type: 'longtext',
            isNullable: false,
            },
            {
            name: 'images',
            type: 'longtext',
            isNullable: true,
            },
            {
            name: 'below_images',
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
    await queryRunner.dropTable('ductile_iron_pipes_applications');
    }
}
