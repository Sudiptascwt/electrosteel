import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PipesJointingTable1760002401404 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name: 'pipes_jointing',
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
                name: 'url',
                type: 'longtext',
                isNullable: true,
                },
                {
                name: 'description',
                type: 'longtext',
                isNullable: true,
                },
                {
                name: 'image',
                type: 'text',
                isNullable: true,
                },
            {
                name: 'pdf',
                type: 'text',
                isNullable: true,
                },
                {
                name: 'created_at',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
                },
                {
                name: 'modified_at',
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
        await queryRunner.dropTable('pipes_jointing');
    }
}
