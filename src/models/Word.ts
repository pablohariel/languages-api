import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm'
import Idiom from '@models/Idiom'
import Subject from '@models/Subject'

@Entity('words')
export default class Word {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    phrases: string

    @ManyToOne(() => Subject, subject => subject.words)

    @JoinColumn({ name: 'subject_id' })
    subject: Subject

    @ManyToOne(() => Idiom, idiom => idiom.words)

    @JoinColumn({ name: 'idiom_id' })
    idiom: Idiom
}
