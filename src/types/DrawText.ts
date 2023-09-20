import { PDFPage, PDFFont, RGB } from "pdf-lib";

export type DrawText = {
  page: PDFPage;
  text: string;
  x: number;
  y: number;
  size?: number;
  font?: PDFFont;
  color?: RGB;
};
