import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Idiom from '@models/Idiom'
import IdiomView from '@views/IdiomView'

export default {
  async index (req: Request, res: Response) {
    try {
      const idiomsRepository = getRepository(Idiom)

      const idioms = await idiomsRepository.find({
        relations: ['subjects', 'words', 'subjects.words']
      })

      return res.status(200).json(IdiomView.renderMany(idioms))
    } catch (err) {
      return res.status(400).json({ message: 'error getting idioms' })
    }
  },
  async show (req: Request, res: Response) {
    try {
      const { id } = req.params

      const idiomsRepository = getRepository(Idiom)

      const idiom = await idiomsRepository.findOneOrFail(id, {
        relations: ['subjects', 'words', 'subjects.words']
      })

      return res.status(200).json(IdiomView.render(idiom))
    } catch (err) {
      return res.status(400).json({ message: 'error getting idiom' })
    }
  },
  async create (req: Request, res: Response) {
    try {
      const { name } = req.body

      const data = {
        name
      }
      const idiomsRepository = getRepository(Idiom)
      const idiom = idiomsRepository.create(data)

      await idiomsRepository.save(idiom)

      return res.status(200).json(IdiomView.render(idiom))
    } catch (err) {
      return res.status(400).json({ message: 'error creating a new idiom' })
    }
  },
  async update (req: Request, res: Response) {
    try {
      const { id } = req.params
      const { name } = req.body

      if (!name) {
        throw new Error('invalid name')
      }

      const idiomsRepository = getRepository(Idiom)
      const idiom = await idiomsRepository.findOneOrFail(id)

      idiom.name = name

      await idiomsRepository.save(idiom)

      return res.status(200).json(IdiomView.render(idiom))
    } catch (err) {
      return res.status(400).json({ message: 'error updating the idiom' })
    }
  },
  async delete (req: Request, res: Response) {
    try {
      const { id } = req.params

      const idiomsRepository = getRepository(Idiom)
      const idiom = await idiomsRepository.findOneOrFail(id)
      await idiomsRepository.delete(idiom)

      return res.status(200).json(IdiomView.render(idiom))
    } catch (err) {
      console.log(err)
      return res.status(400).json({ message: 'error deleting the idiom' })
    }
  }
}
