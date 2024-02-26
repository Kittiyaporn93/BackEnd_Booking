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
        type: Sequelize.INTEGER,
        foreignKey: false
    },
    Type_id:{
        type: Sequelize.INTEGER,
        foreignKey: false
    },
    Room:{
        type: Sequelize.INTEGER,
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
const Room = sequelize.define('Room', {
    Room_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    Type_id:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Type_Name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

BookingHotel.belongsTo(Users, { foreignKey: 'User_id', as: 'belongsToUsers' });
BookingHotel.belongsTo(RoomType, { foreignKey: 'Type_id', as: 'belongsToRoomType' });
BookingHotel.belongsTo(Room, { foreignKey: 'Room_id', as: 'belongsToRoom' });

// Assuming you have already defined your Sequelize model and set up the database connection
sequelize.sync()
// Create a new user
// Create a new booking
app.post('/Booking', async (req, res) => {
    try {
        const newBooking = await BookingHotel.create(req.body);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all bookings
app.get('/Booking', async (req, res) => {
    try {
        const allBookings = await BookingHotel.findAll();
        res.json(allBookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get booking by ID
app.get('/Booking/:id', async (req, res) => {
    try {
        const booking = await BookingHotel.findByPk(req.params.id);
        if (!booking) {
            res.status(404).json({ error: 'Booking not found' });
        } else {
            res.json(booking);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update booking by ID
app.put('/Booking/:id', async (req, res) => {
    try {
        const booking = await BookingHotel.findByPk(req.params.id);
        if (!booking) {
            res.status(404).json({ error: 'Booking not found' });
        } else {
            await booking.update(req.body);
            res.json(booking);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete booking by ID
app.delete('/Booking/:id', async (req, res) => {
    try {
        const booking = await BookingHotel.findByPk(req.params.id);
        if (!booking) {
            res.status(404).json({ error: 'Booking not found' });
        } else {
            await booking.destroy();
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//--Users-----------------------------------------------------------------------------
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
//---RoomType--------------------------------------------------------------------------------
// Create a new RoomType
app.post('/RoomType', async (req, res) => {
    try {
        const newRoomType = await RoomType.create(req.body);
        res.status(201).json(newRoomType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all RoomType
app.get('/RoomType', async (req, res) => {
    try {
        const allRoomTypes = await RoomType.findAll();
        res.json(allRoomTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get RoomType by ID
app.get('/RoomType/:id', async (req, res) => {
    try {
        const roomType = await RoomType.findByPk(req.params.id);
        if (!roomType) {
            res.status(404).json({ error: 'RoomType not found' });
        } else {
            res.json(roomType);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update RoomType by ID
app.put('/RoomType/:id', async (req, res) => {
    try {
        const roomType = await RoomType.findByPk(req.params.id);
        if (!roomType) {
            res.status(404).json({ error: 'RoomType not found' });
        } else {
            await roomType.update(req.body);
            res.json(roomType);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete RoomType by ID
app.delete('/RoomType/:id', async (req, res) => {
    try {
        const roomType = await RoomType.findByPk(req.params.id);
        if (!roomType) {
            res.status(404).json({ error: 'RoomType not found' });
        } else {
            await roomType.destroy();
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//---Room----------------------------------------------------------------------------------------------
// Create a new room
app.post('/Room', async (req, res) => {
    try {
        const newRoom = await Room.create(req.body);
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all rooms
app.get('/Room', async (req, res) => {
    try {
        const allRooms = await Room.findAll();
        res.json(allRooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get room by ID
app.get('/Room/:id', async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (!room) {
            res.status(404).json({ error: 'Room not found' });
        } else {
            res.json(room);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update room by ID
app.put('/Room/:id', async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (!room) {
            res.status(404).json({ error: 'Room not found' });
        } else {
            await room.update(req.body);
            res.json(room);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete room by ID
app.delete('/Room/:id', async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (!room) {
            res.status(404).json({ error: 'Room not found' });
        } else {
            await room.destroy();
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));