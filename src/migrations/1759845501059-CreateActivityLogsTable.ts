import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateActivityLogsTable1759845501059 implements MigrationInterface {

    // public async up(queryRunner: QueryRunner): Promise<void> {
    // }

    // public async down(queryRunner: QueryRunner): Promise<void> {
    // }
    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE activity_logs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NULL,
            action VARCHAR(255) NOT NULL,
            model VARCHAR(255) NULL,
            data JSON NULL,
            ip VARCHAR(50) NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE activity_logs`);
    }


}
