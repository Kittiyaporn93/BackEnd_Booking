const e = require('express');
const express = require('express');
const Sequelize = require('sequelize');
const app = express();

app.use(express.json());

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/SQHotel.sqlite'
});
const BookingHotel = sequelize.define('Booking', { //studio Anime
    Booking_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    User_id: { // foreign key to Studio
        type: Sequelize.STRING,
        foreignKey: false
    },
    Type_id:{
        type: Sequelize.STRING,
        foreignKey: false
    }
}, {
    timestamps: false
});
const Users = sequelize.define('Users', {
    User_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    Name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    phone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});
const RoomType = sequelize.define('RoomType', {
    Type_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    Type_Name:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Assuming you have already defined your Sequelize model and set up the database connection
sequelize.sync();
// Create a new user
app.post('/users', async (req, res) => {
    try {
        const newUser = await Users.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const allUsers = await Users.findAll();
        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            await user.update(req.body);
            res.json(user);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            await user.destroy();
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
