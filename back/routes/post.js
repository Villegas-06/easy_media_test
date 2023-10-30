const express = require('express');
const router = express.Router();
const Posts = require('../models/Post');
const moment = require('moment');

router.get('/', async (req, res) => {
    try {
        const { userId, selectedDate } = req.query;

        // Parse the selectedDate from the query parameter in "DD/MM/YY" format
        const parsedDate = moment(selectedDate, 'DD/MM/YY').toDate();

        // Extract the day, month, and year components of the parsedDate
        const day = parsedDate.getDate();
        const month = parsedDate.getMonth();
        const year = parsedDate.getFullYear();

        // Find posts that match the day, month, and year components
        const posts = await Posts.find({
            userId,
            datetime: {
                $gte: new Date(year, month, day),  // Start of the selected day
                $lt: new Date(year, month, day + 1)  // Start of the next day
            }
        });

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los mensajes del usuario' });
    }
});
router.get('/search', async (req, res) => {
    try {
        const { keyword, selectedDate } = req.query;

        const keywordLowerCase = keyword.trim().toLowerCase();

        // Parse the selectedDate from the query parameter in "DD/MM/YY" format
        const parsedDate = moment(selectedDate, 'DD/MM/YY').toDate();

        // Extract the day, month, and year components of the parsedDate
        const day = parsedDate.getDate();
        const month = parsedDate.getMonth();
        const year = parsedDate.getFullYear();


        // Realiza la búsqueda en la base de datos
        const results = await Posts.find({
            datetime: {
                $gte: new Date(year, month, day),  // Start of the selected day
                $lt: new Date(year, month, day + 1)  // Start of the next day
            },
            $or: [
                { postTitle: { $regex: keywordLowerCase, $options: 'i' } },
                { postTitle: '' } // Incluir resultados si la palabra clave está vacía
            ]
        });

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al realizar la búsqueda' });
    }
});




module.exports = router;
