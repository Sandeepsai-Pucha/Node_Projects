const express = require("express")
const products = require('./data')
const app = express();

// Get All Products API

app.get('/api/products', (req, res) => {
  res.json(products)
})

// Partial Products API 

app.get('/api/products/partial', (req, res) => {
  const partial_products = products.map(product => {
    return {id:product.id, name:product.name}
  })
  res.json(partial_products)
})

// Based on ID API

app.get('/api/products/:productId', (req, res) => {
  const id = Number(req.params.productId)
  const product = products.find(eachProduct => eachProduct.id === id)

  if (!product) {
    return res.status(404).send('Product Not Found..!!')
  }
  res.json(product)
})

// Query Params  

app.get('/api/query', (req, res) => {
  const name = req.query.name.toLowerCase()
  const products_result = products.filter(product => product.name.toLowerCase().includes(name))

  if (products_result.length < 1) {
    return res.status(200).send('No Products Matched Your Searches..!!')
  }

  res.json(products_result)
})



// Middeware Functions 

const firstHandler = ((req, res, next) => {
  if (20 < 21) {
    next()
  }
})

const secondHandler = ((req, res, next) => {
  if (20 > 21) {
    next()
  }
})

const thirdHandler = ((req, res, next) => {
  if (40 < 216) {
    next()
  }
})

app.get('/home', firstHandler, (req, res) => {
  res.send('Hello I am Home Page')
})

app.get('/about', secondHandler, (req, res) => {
  res.send('Hello I am About Page')
})

app.get('/contact', thirdHandler, (req, res) => {
  res.send('Hello I am Contact Page')
})

// Listening On Port 

app.listen(3000, () => {
  console.log('Server Started Running on Port 3000')
})