import AdmZip from 'adm-zip';

type ZipData = {
    name: string;
    data: string;
};

export function getDataFromZipBuf(zipBuff: Buffer): ZipData[] {
    const zip = new AdmZip(zipBuff);
    const zipEntries = zip.getEntries();
    const txtFilesData = zipEntries.map((entry) => {
        return {
            name: entry.entryName,
            data: entry.getData().toString('utf8'),
        };
    }).filter((item) => item.data !== '');

    return txtFilesData;
}