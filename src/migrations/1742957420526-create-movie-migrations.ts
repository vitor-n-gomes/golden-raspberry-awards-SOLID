import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateMovieMigrations1742957420526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
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
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'producerId',
            type: 'int',
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
        referencedColumnNames: ['id'],
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
