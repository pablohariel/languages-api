import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Word from '@models/Word'
import WordView from '@views/WordView'
import Subject from '@models/Subject'
import Idiom from '@models/Idiom'

export default {
  async index (req: Request, res: Response) {
    try {
      const wordRepository = getRepository(Word)

      const words = await wordRepository.find()

      if (words.length < 1) {
        return res.status(200).json([])
      }

      return res.status(200).json(WordView.renderMany(words))
    } catch (err) {
      return res.status(400).json({ message: 'error getting words' })
    }
  },
  async show (req: Request, res: Response) {
    try {
      const { id } = req.params
      const wordRepository = getRepository(Word)

      const word = await wordRepository.findOneOrFail(id)

      return res.status(200).json(WordView.render(word))
    } catch (err) {
      return res.status(400).json({ message: 'error getting word' })
    }
  },
  async create (req: Request, res: Response) {
    try {
      const { name, phrases, subject_id, idiom_id } = req.body

      const idiomRepository = getRepository(Idiom)
      const idiom = await idiomRepository.findOneOrFail(idiom_id, {
        relations: ['subjects', 'words']
      })

      const subjectRepository = getRepository(Subject)
      const subject = await subjectRepository.findOneOrFail(subject_id, {
        relations: ['words']
      })

      if (!idiom.subjects) {
        throw new Error('idiom id is not valid')
      }

      let idiomIsValid = false

      idiom.subjects.forEach(item => {
        if (item.id === subject_id) {
          idiomIsValid = true
        }
      })

      if (!idiomIsValid) {
        throw new Error('idiom id is not valid')
      }

      const data = {
        name,
        phrases,
        idiom,
        subject
      }

      const wordRepository = getRepository(Word)
      const word = wordRepository.create(data)

      await wordRepository.save(word)

      subject.words = ([...subject.words, word])
      await subjectRepository.save(subject)

      idiom.words = ([...idiom.words, word])
      idiom.size = idiom.words.length
      await idiomRepository.save(idiom)

      return res.status(200).json(WordView.render(word))
    } catch (err) {
      console.log(err)
      return res.status(400).json({ message: 'error creating a new word' })
    }
  },
  async update (req: Request, res: Response) {
    try {
      const { id } = req.params
      const { name, phrases, subject_id, idiom_id } = req.body

      if (!name) {
        throw new Error('invalid name')
      }

      const idiomRepository = getRepository(Idiom)
      const idiom = await idiomRepository.findOneOrFail(idiom_id, {
        relations: ['subjects', 'words']
      })

      if (!idiom.subjects) {
        throw new Error('idiom id is not valid')
      }

      let idiomIsValid = false

      idiom.subjects.forEach(item => {
        if (item.id === subject_id) {
          idiomIsValid = true
        }
      })

      if (!idiomIsValid) {
        throw new Error('idiom id is not valid')
      }

      const wordRepository = getRepository(Word)
      const word = await wordRepository.findOneOrFail(id)

      word.name = name
      word.phrases = phrases

      await wordRepository.save(word)

      return res.status(200).json(WordView.render(word))
    } catch (err) {
      console.log(err)
      return res.status(400).json({ message: 'error updating the word' })
    }
  },
  async delete (req: Request, res: Response) {
    try {
      const { id } = req.params

      const wordRepository = getRepository(Word)
      const word = await wordRepository.findOneOrFail(id)
      await wordRepository.delete(word)

      return res.status(200).json(WordView.render(word))
    } catch (err) {
      console.log(err)
      return res.status(400).json({ message: 'error deleting the word' })
    }
  }
}
