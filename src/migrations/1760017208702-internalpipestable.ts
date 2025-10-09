import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Internalpipestable1760017208702 implements MigrationInterface {

public async up(queryRunner: QueryRunner): Promise<void> {
    // -------------------------
    // Create internal_pipes table
    // -------------------------
    await queryRunner.createTable(
      new Table({
        name: "internal_pipes",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "text",
            isNullable: true,
          },
          {
            name: "description",
            type: "longtext",
            isNullable: true,
          },
          {
            name: "guiding_stadards",
            type: "text",
            isNullable: true,
          },
          {
            name: "url",
            type: "text",
            isNullable: true,
          },
          {
            name: "pdf",
            type: "text",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "modified_at",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // -------------------------
    // Create external_pipes table
    // -------------------------
    await queryRunner.createTable(
      new Table({
        name: "external_pipes",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "text",
            isNullable: true,
          },
          {
            name: "description",
            type: "longtext",
            isNullable: true,
          },
          {
            name: "guiding_stadards",
            type: "text",
            isNullable: true,
          },
          {
            name: "url",
            type: "text",
            isNullable: true,
          },
          {
            name: "pdf",
            type: "text",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "modified_at",
            type: "datetime",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("external_pipes");
    await queryRunner.dropTable("internal_pipes");
  }

}
