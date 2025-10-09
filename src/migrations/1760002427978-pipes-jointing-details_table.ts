import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class PipesJointingDetailsTable1760002427978 implements MigrationInterface {

 public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pipes_jointing_details',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'pipes_jointing_id', type: 'int', isNullable: true },
          { name: 'image1', type: 'longtext', isNullable: true },
          { name: 'image2', type: 'longtext', isNullable: true },
          { name: 'image3', type: 'longtext', isNullable: true },
          { name: 'image4', type: 'longtext', isNullable: true },
          { name: 'content', type: 'longtext', isNullable: true },
          { name: 'title', type: 'longtext', isNullable: true },
          { name: 'description', type: 'longtext', isNullable: true },
          { name: 'table_note', type: 'longtext', isNullable: true },
          { name: 'content_image', type: 'longtext', isNullable: true },
          { name: 'add_title', type: 'longtext', isNullable: true },
          { name: 'add_description', type: 'longtext', isNullable: true },
          { name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          { name: 'modified_at', type: 'datetime', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'pipes_jointing_details',
      new TableForeignKey({
        columnNames: ['pipes_jointing_id'],
        referencedTableName: 'pipes_jointing',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('pipes_jointing_details');
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('pipes_jointing_id') !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey('pipes_jointing_details', foreignKey);
    }
    await queryRunner.dropTable('pipes_jointing_details');
  }
}
