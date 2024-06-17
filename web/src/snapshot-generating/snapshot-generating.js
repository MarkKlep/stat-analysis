import html2canvas from 'html2canvas';

export async function createSnapshot(ref) {
    if (!ref.current) return;

    const canvas = await html2canvas(ref.current);
    const imgData = canvas.toDataURL("image/png", 1.0).replace(/^data:image\/png;base64,/, "");

    const response = await sendImageToServer(imgData);
    console.log(response);
}

export async function sendImageToServer(imgData) {
    try {
      const response = await fetch('http://localhost:3001/api/saveHistogramSnapshot', {
        method: 'POST',
        body: JSON.stringify({ imgData }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Помилка при відправці зображення');
      }

      const feedback = await response.text();
      return feedback;

    } catch (error) {
      return 'Помилка:' + error;
    }
}