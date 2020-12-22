import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createIdiom1608673594266 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'idioms',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'subject_id',
          type: 'integer'
        },
        {
          name: 'word_id',
          type: 'integer'
        },
        {
          name: 'size',
          type: 'integer'
        }
      ],
      foreignKeys: [
        {
          name: 'IdiomSubject',
          columnNames: ['subject_id'],
          referencedTableName: 'subjects',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        {
          name: 'IdiomWord',
          columnNames: ['word_id'],
          referencedTableName: 'words',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('idioms')
  }
}
