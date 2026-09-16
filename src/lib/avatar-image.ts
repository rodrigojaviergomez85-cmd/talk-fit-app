/** Client-side square crop + resize so uploads stay small on mobile data. */
export async function toSquareJpegDataUrl(file: File, size = 512, quality = 0.82): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const sx = (bitmap.width - side) / 2;
  const sy = (bitmap.height - side) / 2;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no-canvas");
  ctx.drawImage(bitmap, sx, sy, side, side, 0, 0, size, size);
  bitmap.close?.();

  let url = canvas.toDataURL("image/jpeg", quality);
  let q = quality;
  while (url.length > 520_000 && q > 0.45) {
    q -= 0.1;
    url = canvas.toDataURL("image/jpeg", q);
  }
  return url;
}
