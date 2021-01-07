import express from 'express'
import './database/connection'
import IdiomController from '@controllers/IdiomController'
import SubjectController from '@controllers/SubjectController'
import WordController from '@controllers/WordController'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' })
})

app.get('/idiom', IdiomController.index)
app.get('/idiom/:id', IdiomController.show)
app.post('/idiom', IdiomController.create)
app.put('/idiom/:id', IdiomController.update)
app.delete('/idiom/:id', IdiomController.delete)

app.get('/subject', SubjectController.index)
app.post('/subject', SubjectController.create)
app.get('/subject/:id', SubjectController.show)
app.put('/subject/:id', SubjectController.update)
app.delete('/subject/:id', SubjectController.delete)

app.get('/word', WordController.index)
app.post('/word', WordController.create)
app.get('/word/:id', WordController.show)
app.put('/word/:id', WordController.update)
app.delete('/word/:id', WordController.delete)

app.listen(3333, () => {
  console.log('server up at port 3333')
})
