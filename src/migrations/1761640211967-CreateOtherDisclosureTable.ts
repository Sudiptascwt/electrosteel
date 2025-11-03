import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOtherDisclosureTable1761640211967 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // -------------------------
        // Create internal_pipes table
        // -------------------------
        await queryRunner.createTable(
        new Table({
            name: "other_disclosure",
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
        await queryRunner.dropTable("other_disclosure");
    }
}
