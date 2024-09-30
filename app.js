const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config()

var usersRouter = require('./routes/users');

const app = express();

app.use(express.json({ limit: '900mb' }));
app.use(cors());
app.use(express.urlencoded({ limit: '900mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes here
app.use('/', usersRouter);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
