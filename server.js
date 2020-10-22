const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())
app.use(logger('dev'))

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
})

const blogs =
  [
    {
      id: "32e3ee5c-98dc-62a6-b284-0da231e3abb6",
      title: "Lorem Ipsum Dolor",
      imgUrl: "https://www.unsplash.com/92hd.png",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      author: "James Mernin",
      email: "jamespmernin@gmail.com"
    }, {
      id: "44b5fe5c-98dc-62a6-b284-0da231e3abb6",
      title: "Gibberish",
      imgUrl: "https://www.unsplash.com/64ea.png",
      content: "This is a whole bunch of gibberish that is only being used to fill space for this blogging exercise. I have nothing substantive to contribute to this post becuase this post is only being used to fill space with a reasonable amount of length that will pass as susbtance at first glance. If you read into this any more than what is intended, you will surely be disappointed by the utter lack of content in this post, and you will probably wonder why you wasted your time reading it.",
      author: "James Mernin",
      email: "jamespmernin@gmail.com"
    }
  ]

app.get('/', (req, res) => {
  res.send("This is root!");
});

app.get('/blogs', (req, res) => {
  res.json(blogs)
})

app.get('/blogs/:id', (req, res) => {
  const { id } = req.params
  const blog = blogs.filter(blog => blog.id === id)[0]
  res.json(blogs)
})

app.post('/blogs', (req, res) => {
  const blog = req.body
  blogs.push(blog)
  res.json(blogs)
})

app.put('/blogs/:id', (req, res) => {
  const id = req.params.id
  const blogIndex = blogs.findIndex(blog => blog.id === id)
  const blog = { ...blogs[blogIndex], ...req.body }
  blogs.splice(blogIndex, 1, blog)
  res.json(blog)
})

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id
  const blogIndex = blogs.findIndex(blog => blog.id === id)
  blogs.splice(blogIndex, 1)
  res.json(blogs)
})