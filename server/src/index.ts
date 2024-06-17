import express from 'express';
import cors from 'cors';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { getDataFromZipBuf } from './zip-buffer-processing.js';
import { PORT, relPathToZip } from './constants.js';

const app = express();
app.use(cors());

app.get('/api/loadZipData', async (req, res) => {
    const pathToZip = fileURLToPath(new URL(relPathToZip, import.meta.url));

    const zipBuff = await readFile(pathToZip);

    const txtFilesData = getDataFromZipBuf(zipBuff);

    res.status(200).send(txtFilesData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
