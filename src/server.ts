import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' })
})

app.post('/idiom', (req, res) => {
  console.log(req.body)
})

app.listen(3333, () => {
  console.log('server up at port 3333')
})
