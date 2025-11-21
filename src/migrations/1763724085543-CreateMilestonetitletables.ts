import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMilestonetitletables1763724085543 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "milestones",
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
                        name: "year",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: "description",
                        type: "longtext",
                        isNullable: true,
                    },
                    {
                        name: "title_id",
                        type: "int",
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

        // Add FK (milestones.title_id → milestones_title.id)
        await queryRunner.createForeignKey(
            "milestones",
            new TableForeignKey({
                columnNames: ["title_id"],
                referencedTableName: "milestones_title",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        // First remove FK
        const table = await queryRunner.getTable("milestones");
        const foreignKey = table.foreignKeys.find(
            fk => fk.columnNames.indexOf("title_id") !== -1
        );
        if (foreignKey) {
            await queryRunner.dropForeignKey("milestones", foreignKey);
        }

        // Drop table
        await queryRunner.dropTable("milestones");
    }

}
