const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Data persistence
const DB_PATH = path.join(__dirname, 'data.json');
const getDB = () => {
    if (!fs.existsSync(DB_PATH)) {
        return { programs: [], events: [], joinRequests: [] };
    }
    return JSON.parse(fs.readFileSync(DB_PATH));
};
const saveDB = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Multer Config for Images
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
    }
});
const upload = multer({ storage });

// --- ROUTES ---

// 1. Upload New Program
// Expects: icon (file), initialImg (file), finalImg (file), title (text), description (text)
app.post('/api/programs', upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'initialImg', maxCount: 1 },
    { name: 'finalImg', maxCount: 1 }
]), (req, res) => {
    try {
        const { title, description } = req.body;
        const files = req.files;

        const newProgram = {
            id: Date.now(),
            title,
            description,
            icon: files.icon ? `/uploads/${files.icon[0].filename}` : null,
            initialImg: files.initialImg ? `/uploads/${files.initialImg[0].filename}` : null,
            finalImg: files.finalImg ? `/uploads/${files.finalImg[0].filename}` : null,
            timestamp: new Date().toISOString()
        };

        const db = getDB();
        db.programs.push(newProgram);
        saveDB(db);

        res.status(201).json({ message: 'Program uploaded successfully', program: newProgram });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Create New Event
app.post('/api/events', (req, res) => {
    const { title, date, location, type } = req.body;
    const db = getDB();
    const newEvent = { id: Date.now(), title, date, location, type };
    db.events.push(newEvent);
    saveDB(db);
    res.status(201).json(newEvent);
});

// 3. Join Mission / Registration
app.post('/api/join', (req, res) => {
    const { name, email, interest } = req.body;
    const db = getDB();
    const newRequest = { id: Date.now(), name, email, interest, status: 'pending' };
    db.joinRequests.push(newRequest);
    saveDB(db);
    res.status(201).json({ message: 'Registration received', id: newRequest.id });
});

// 4. Fetch All Data
app.get('/api/data', (req, res) => {
    res.json(getDB());
});

app.listen(PORT, () => {
    console.log(`EcoVerse Backend running on http://localhost:${PORT}`);
});
