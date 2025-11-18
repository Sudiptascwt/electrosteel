import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStatisticsTable1763461762109 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'statistics',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },

          // title1 group
          {
            name: 'title1',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'number1',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'number_video1',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'number_video_id_1',
            type: 'bigint',
            isNullable: true,
          },

          // title2 group
          {
            name: 'title2',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'number2',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'number_video2',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'number_video_id_2',
            type: 'bigint',
            isNullable: true,
          },

          // title3 group
          {
            name: 'title3',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'number3',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'number_video3',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'number_video_id_3',
            type: 'bigint',
            isNullable: true,
          },

          // title4 group
          {
            name: 'title4',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'number4',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'number_video4',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'number_video_id_4',
            type: 'bigint',
            isNullable: true,
          },

          // pipes / overview / description
          {
            name: 'pipes_title',
            type: 'longtext',
            isNullable: true,
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
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'overview_sub_title',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'longtext',
            isNullable: true,
          },

          // timestamps
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
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('statistics', true);
  }
}
