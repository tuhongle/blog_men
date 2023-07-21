import express from 'express'
import Blog from '../models/blogModel.js'

const router = express.Router()

router.get('/create', async (req, res) => {
   await res.render('newBlog', {title: 'Create Blog'})
})

router.get('/', async (req, res) => {
    const result = await Blog.find().sort({createdAt: -1})
    await res.status(200).render('index', {title: 'Blogs', blogs: result})
})

router.post('/', async (req, res) => {
    const body = req.body;
    await Blog.create(body)
    await res.status(201).redirect('/')
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Blog.findById(id)
    await res.status(200).render('singleBlog', {title: 'Single Blog', blog: result})
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id)
    await res.status(401).json({ redirect: '/blogs' })
})

router.get('/:id/edit', async(req, res) => {
    const id = req.params.id;
    const result = await Blog.findById(id);
    await res.status(200).render('editBlog', { title: 'Edit Blog', blog: result});
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Blog.findByIdAndUpdate(id, req.body)
    await res.status(201).render('singleBlog', { title: 'Single Blog', blog: result})
})

export default router;