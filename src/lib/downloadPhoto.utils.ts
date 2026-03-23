export default function downloadPhoto(imagePath: string, filename: string) {
  const anchor = document.createElement("a");
  anchor.href = imagePath;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
