import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateDisclosuretableAndDisclosureimagetable1761573068100 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1️⃣ Create disclosure table
    await queryRunner.createTable(
      new Table({
        name: 'disclosure',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'modified_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // 2️⃣ Create disclosure_images table (make sure disclosure_id exists here)
    await queryRunner.createTable(
      new Table({
        name: 'disclosure_images', // or disclosure_images
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'disclosure_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'image',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'modified_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'disclosure_images',
      new TableForeignKey({
        columnNames: ['disclosure_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'disclosure',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('disclosure_images');
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.includes('disclosure_id'));
    if (foreignKey) {
      await queryRunner.dropForeignKey('disclosure_images', foreignKey);
    }

    await queryRunner.dropTable('disclosure_images');
    await queryRunner.dropTable('disclosure');
  }
}
