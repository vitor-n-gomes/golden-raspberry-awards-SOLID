import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProducerMigrations1742957485506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'producer',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'uuid',
              },
              {
                name: 'name',
                type: 'varchar',
              },
            ],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('producer');
      }
}
