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
          name: 'idiom_id',
          type: 'integer',
          isNullable: true
        },
        {
          name: 'description',
          type: 'varchar'
        }
      ],
      foreignKeys: [
        {
          name: 'SubjectIdiom',
          columnNames: ['idiom_id'],
          referencedTableName: 'idioms',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('subjects')
  }
}
