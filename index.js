const express = require('express');
const mongoose = require('mongoose');
const Member = require('./models/member');

const app = express();

const mongoDB = "mongodb+srv://sohamchitale:mmowLavsukXBGc9K@cluster0.jorsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
    console.log("Connected to mongoDB successfully🎉");
}

app.use(express.json());

app.use('/api', require('./routes/add-member'));
app.use('/api', require('./routes/list-members'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/add-member', async (req, res) => {
    try {
        const newMember = new Member(req.body);
        await newMember.save();
        res.status(201).json(newMember);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});