import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm'
import Word from './Word'
import Idiom from './Idiom'

@Entity('subjects')
export default class Subject {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @ManyToOne(() => Idiom, idiom => idiom.subjects)

    @JoinColumn({ name: 'idiom_id' })
    idiom: Idiom

    @OneToMany(() => Word, words => words.subject, {
      cascade: ['insert', 'update']
    })

    @JoinColumn({ name: 'subject_id' })
    words: Word[]
}
