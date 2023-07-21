import express from 'express'
import Blog from '../models/blogModel.js'

const router = express.Router()

router.get('/create', async (req, res) => {
   await res.render('newBlog', {title: 'Create Blog', newBlog: true, home: false, about: false})
})

router.get('/', async (req, res) => {
    const page = req.query.page || 0;
    const blogsPerPage = 3;

    const result = await Blog.find().sort({createdAt: -1}).skip(page * blogsPerPage).limit(blogsPerPage)
    const totalBlogs = await Blog.find()
    const blogPages = Math.ceil(totalBlogs.length / blogsPerPage)
    await res.status(200).render('index', {title: 'Blogs', blogs: result, blogPages, home: true, about: false, newBlog: false})
})

router.post('/', async (req, res) => {
    const body = req.body;
    await Blog.create(body)
    await res.status(201).redirect('/')
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await Blog.findById(id)
    await res.status(200).render('singleBlog', {title: 'Single Blog', blog: result, home: false, about: false, newBlog: false})
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id)
    await res.status(401).json({ redirect: '/blogs' })
})

router.get('/:id/edit', async(req, res) => {
    const id = req.params.id;
    const result = await Blog.findById(id);
    await res.status(200).render('editBlog', { title: 'Edit Blog', blog: result, home: false, about: false, newBlog: false});
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    const result = await Blog.findByIdAndUpdate(id, req.body, {
        new: true
    });
    await res.status(201).json({redirect: `/blogs/${id}`});
})

export default router;