import express from 'express';

const app = express();
const PORT = 3000;

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1423610942100607127/MFKClHF84GId5_6ijzcis1KlxGrbZ1Xd_8LAK3QV2-sGLD5ff9Blx77Bammh3PB1_qzr';

app.use(express.json());

app.post('/notify',  (req, res) => {
    const {message} = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content:message})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Discord responded with status ${response.status}`);
        }
        res.json({status: 'Message sent...'});
    })
    .catch(error => {
        console.error('Error sending to discord', error);
        res.status(500).json({error:'Failed sending your message'});
    });
})

app.listen(PORT, () =>{
    console.log(`Server running at localhost: ${PORT}`);
})