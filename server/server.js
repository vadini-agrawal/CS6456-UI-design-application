require('dotenv').config()
const express = require('express')
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const cors = require('cors')
const { CLIENT_ORIGIN } = require('./config')

const app = express()
const port = process.env.PORT || 8080;

cloudinary.config({ 
  // cloud_name: process.env.CLOUD_NAME, 
  // api_key: process.env.API_KEY, 
  // api_secret: process.env.API_SECRET,
  cloudinary_url: process.env.CLOUDINARY_URL
})
  
app.use(cors({ 
  origin: CLIENT_ORIGIN, 
})) 

// console.log(cloudinary);

app.use(formData.parse())

app.get('/wake-up', (req, res) => res.send('👌'))

app.post('/image-upload', (req, res) => {
  const values = Object.values(req.files)
  console.log(values[0].path)
  const promises = values.map(image => cloudinary.uploader.upload(image.path));

  Promise
    .all(promises)
    .then(results => res.json(results))
    .catch((err) => res.status(400).json(err))
})

app.listen(port, () => console.log(`Running on Port ${port}👍`))