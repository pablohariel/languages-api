import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createWord1608673666082 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'words',
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
          type: 'integer',
          isNullable: true
        },
        {
          name: 'idiom_id',
          type: 'integer',
          isNullable: true
        },
        {
          name: 'phrases',
          type: 'varchar',
          isNullable: true
        }
      ],
      foreignKeys: [
        {
          name: 'WordSubject',
          columnNames: ['subject_id'],
          referencedTableName: 'subjects',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        {
          name: 'WordIdiom',
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
    await queryRunner.dropTable('words')
  }
}
