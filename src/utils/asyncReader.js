export function readAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

export function readAsImage(file) {
  return new Promise((resolve, reject) => {
    if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
      reject(`Image type '${file.type}' is not supported.`);
    }
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      resolve(img);
    };
    img.onerror = reject;
    img.src = objectUrl;
  });
}

export function readAsPDF(file) {
  if (!pdfjsLib) throw new Error('PDF.js not loaded yet.');
  return pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
}