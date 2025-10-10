import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductDuctileIronFittingTable1760099591497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // -------------------------
        // Create internal_pipes table
        // -------------------------
        await queryRunner.createTable(
        new Table({
            name: "ductile_iron_fittings_details",
            columns: [
            {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
            },
            {
                name: "main_title",
                type: "text",
                isNullable: true,
            },
            {
                name: "sub_title",
                type: "text",
                isNullable: true,
            },
            {
                name: "properties",
                type: "longtext",
                isNullable: true,
            },
            {
                name: "images",
                type: "text",
                isNullable: true,
            },
            {
                name: "below_images",
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
    await queryRunner.dropTable("ductile_iron_fittings_details");
    }

}
