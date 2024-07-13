import { transformUrls } from './transformUrls.js';
import { fetchData } from './fetchData.js';
import express from 'express';

const app = express();
const PORT = 4000;

app.get('/api/files', async (req, res) => {
    try {
       fetchData().then(r => {
            let result = transformUrls(r.items.map(f => f.fileUrl));
            console.log(JSON.stringify(result, null, 2));
            res.send(result);
       })
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).send('Error fetching data');
    }
});
    
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
