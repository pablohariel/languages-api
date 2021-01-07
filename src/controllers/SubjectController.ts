import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Subject from '@models/Subject'
import SubjectView from '@views/SubjectView'
import Idiom from '@models/Idiom'

export default {
  async index (req: Request, res: Response) {
    try {
      const subjectRepository = getRepository(Subject)

      const subjects = await subjectRepository.find({
        relations: ['idiom', 'words', 'idiom.words']
      })

      if (subjects.length < 1) {
        return res.status(200).json([])
      }

      return res.status(200).json(SubjectView.renderMany(subjects))
    } catch (err) {
      return res.status(400).json({ message: 'error getting subjects' })
    }
  },
  async show (req: Request, res: Response) {
    try {
      const { id } = req.params

      const subjectRepository = getRepository(Subject)

      const subject = await subjectRepository.findOneOrFail(id, {
        relations: ['idiom', 'words', 'idiom.words']
      })

      return res.status(200).json(SubjectView.render(subject))
    } catch (err) {
      return res.status(400).json({ message: 'error getting subject' })
    }
  },
  async create (req: Request, res: Response) {
    try {
      const { name, description = '', idiom_id } = req.body

      const idiomRepository = getRepository(Idiom)
      const idiom = await idiomRepository.findOneOrFail(idiom_id, {
        relations: ['subjects']
      })

      const data = {
        name,
        description,
        idiom_id,
        idiom
      }

      const subjectRepository = getRepository(Subject)
      const subject = subjectRepository.create(data)
      await subjectRepository.save(subject)
      idiom.subjects = ([...idiom.subjects, subject])

      await idiomRepository.save(idiom)
      return res.status(200).json(SubjectView.render(subject))
    } catch (err) {
      console.log(err)
      return res.status(400).json({ message: 'error creating a new subject' })
    }
  },
  async update (req: Request, res: Response) {
    try {
      const { id } = req.params
      const { name, description } = req.body

      if (!name) {
        throw new Error('invalid name')
      }

      if (!description) {
        throw new Error('invalid description')
      }

      const subjectRepository = getRepository(Subject)
      const subject = await subjectRepository.findOneOrFail(id, {
        relations: ['idiom', 'words', 'idiom.words']
      })

      console.log(subject)

      subject.name = name
      subject.description = description

      await subjectRepository.save(subject)

      return res.status(200).json(SubjectView.render(subject))
    } catch (err) {
      return res.status(400).json({ message: 'error updating the subject' })
    }
  },
  async delete (req: Request, res: Response) {
    try {
      const { id } = req.params

      const subjectRepository = getRepository(Subject)
      const subject = await subjectRepository.findOneOrFail(id, {
        relations: ['idiom', 'words', 'idiom.words']
      })

      await subjectRepository.delete(subject)

      return res.status(200).json(SubjectView.render(subject))
    } catch (err) {
      return res.status(400).json({ message: 'error deleting the subject' })
    }
  }
}
