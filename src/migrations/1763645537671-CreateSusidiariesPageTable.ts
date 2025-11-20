import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSusidiariesPageTable1763645537671 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "subsidiaries_page",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "banner_image",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: "title",
                        type: "longtext",
                        isNullable: true,
                    },
                    {
                        name: "description",
                        type: "longtext",
                        isNullable: false,
                    },
                    {
                        name: "image",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: "image_id",
                        type: "bigint",
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
        await queryRunner.dropTable("subsidiaries_page");
    }

}
