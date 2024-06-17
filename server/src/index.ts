import express from 'express';
import cors from 'cors';
import AdmZip from 'adm-zip';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const app = express();
app.use(cors());

const PORT = 3001;

app.get('/api/loadZipData', async (req, res) => {
    const pathToZip = fileURLToPath(new URL('./assets/stat-data.zip', import.meta.url));

    const zipBuffer = await readFile(pathToZip);

    const zip = new AdmZip(zipBuffer);
    const zipEntries = zip.getEntries();
    const data = zipEntries.map((entry) => {
        if (entry.entryName.includes('stat-data')) {
            return {
                name: entry.entryName,
                data: entry.getData(),
            };
        }
    });

    const notEmptyData = data.filter((entry) => entry.data.length > 0);

    res.status(200).send(notEmptyData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
