import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportToPdf(element) {
  const canvas = await html2canvas(element, {
    scale: 2, // Higher resolution
    useCORS: true
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const ratio = canvasHeight / canvasWidth;

  const pdfWidth = pageWidth;
  const pdfHeight = pageWidth * ratio;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('invoice.pdf');
}


export async function exportToImage(element, type = 'png') {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true
  });

  const data = canvas.toDataURL(`image/${type}`);
  const link = document.createElement('a');
  link.href = data;
  link.download = `invoice.${type}`;
  link.click();
}
