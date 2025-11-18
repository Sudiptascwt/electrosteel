import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLowerStatisticTable1763447420771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lower_statistics',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'pipes_title',
            type: 'longtext',
            isNullable: false,
          },
          {
            name: 'pipes_number',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'overview_image',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'overview_image_id',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'overview_title',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'overview_sub_title',
            type: 'longtext',
            isNullable: true,
          },
          {
            name: 'description',
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
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lower_statistics');
  }
}
