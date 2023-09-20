import { PDFFont, PDFPage, rgb } from "pdf-lib";

export const drawText = (
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  size = 14,
  font: PDFFont,
  color = rgb(0, 0, 0)
) => {
  page.drawText(text, {
    x,
    y,
    size,
    font,
    color,
  });
};
