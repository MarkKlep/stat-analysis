import express from 'express';
import cors from 'cors';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { getDataFromZipBuf } from './zip-buffer-processing.js';
import { PORT, relPathToZip, relPathToTmp } from './constants.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/loadZipData', async (req, res) => {
    const pathToZip = fileURLToPath(new URL(relPathToZip, import.meta.url));

    const zipBuff = await readFile(pathToZip);

    const txtFilesData = getDataFromZipBuf(zipBuff);

    res.status(200).send(txtFilesData);
});

app.post('/api/saveHistogramSnapshot', async (req, res) => {
  try {
      const imgName = req.body.imgName;

      const imgBuffer = Buffer.from(req.body.imgData, 'base64');
      const pathToTmp = fileURLToPath(new URL(relPathToTmp + imgName, import.meta.url));
      
      await writeFile(pathToTmp, imgBuffer);

      res.status(200).send('Snapshot saved successfully');
      
  } catch (error) {
      console.error(error);
      res.status(500).send('Error saving snapshot');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
