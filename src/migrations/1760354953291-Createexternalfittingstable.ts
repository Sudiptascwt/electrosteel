import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Createexternalfittingstable1760354953291 implements MigrationInterface {

public async up(queryRunner: QueryRunner): Promise<void> {
    // -------------------------
    // Create fittings_internal_pipes table
    // -------------------------
    await queryRunner.createTable(
      new Table({
        name: "fittings_internal_pipes",
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
        name: "fittings_external_pipes",
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
    await queryRunner.dropTable("fittings_external_pipes");
    await queryRunner.dropTable("fittings_internal_pipes");
  }

}
