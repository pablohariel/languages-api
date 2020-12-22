import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createSubject1608673761822 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'subjects',
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
          name: 'word_id',
          type: 'integer'
        },
        {
          name: 'idiom_id',
          type: 'integer'
        },
        {
          name: 'description',
          type: 'varchar'
        }
      ],
      foreignKeys: [
        {
          name: 'SubjectWord',
          columnNames: ['word_id'],
          referencedTableName: 'words',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        {
          name: 'SubjectIdiom',
          columnNames: ['idiom_id'],
          referencedTableName: 'idioms',
          referencedColumnNames: ['id']
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('subjects')
  }
}
