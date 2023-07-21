import express from "express";
import env from 'dotenv';
import mongoose from "mongoose";
import { default as blogRoutes } from './routes/blogRoutes.js'

env.config();

const app = express();
const PORT = process.env.PORT || 3000;

// app.listen(PORT);

// config mongodb
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err)
    })

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.render('404', {title: '404'})
})