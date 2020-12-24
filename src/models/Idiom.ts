import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm'
import Subject from '@models/Subject'
import Word from '@models/Word'

@Entity('idioms')
export default class Idiom {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    size: number

    @OneToMany(() => Subject, subjects => subjects.idiom, {
      cascade: ['insert', 'update']
    })

    @JoinColumn({ name: 'idiom_id' })
    subjects: Subject[]

    @OneToMany(() => Word, words => words.idiom, {
      cascade: ['insert', 'update']
    })

    @JoinColumn({ name: 'idiom_id' })
    words: Word[]
}
