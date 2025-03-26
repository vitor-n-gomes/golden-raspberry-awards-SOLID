import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateMovieMigrations1742957420526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'year',
            type: 'int',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'studios',
            type: 'varchar',
          },
          {
            name: 'winner',
            type: 'boolean',
            default: false,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'movie_producers_producer',
        columns: [
          {
            name: 'movieId',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'producerId',
            type: 'uuid',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'movie_producers_producer',
      new TableForeignKey({
        columnNames: ['movieId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movie',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'movie_producers_producer',
      new TableForeignKey({
        columnNames: ['producerId'],
        referencedColumnNames: ['uuid'],
        referencedTableName: 'producer',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movie_producers_producer');
    await queryRunner.dropTable('movie');
  }

}
