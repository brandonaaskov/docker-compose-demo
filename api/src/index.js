const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  Message.findOne({ context: 'demo' }, (err, doc) => {
    if (err) return console.error(err)
    console.log('first fetch', doc)
    return res.json({ text: doc.text })
  })
})

app.post('/', (req, res) => {
  const { text } = req.body

  Message.findOneAndUpdate({ context: 'demo' }, { text }, { new: true }, (err, doc) => {
    if (err) return res.json(err)
    res.json(doc)
  })
})

mongoose.connect('mongodb://db/test')
const db = mongoose.connection
db.once('open', () => {
  app.listen(3000)
  console.log('API listening on port 3000')

  Message.findOne({ context: 'demo' }, (err, doc) => {
    if (doc) return
    
    const demoMessage = new Message({
      context: 'demo',
      text: 'demo'
    })

    demoMessage.save((saveError, demoSaved) => {
      if (saveError) return console.error(saveError)
      console.log('demo message created!', demoSaved, demoMessage)
    })
  })
})

const messageSchema = mongoose.Schema({
  context: String,
  text: String
})

const Message = mongoose.model('Message', messageSchema)