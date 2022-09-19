import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PDFExcelService {

  downloadPDF() {
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
  }

 downloadExcel(){
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet('Demo');
  worksheet.getColumn(2).width = 30;
  worksheet.getColumn(3).width = 20;
  worksheet.getColumn(4).width = 20;
  worksheet.getColumn(5).width = 20;
  worksheet.getColumn(6).width = 30;
  worksheet.getColumn(7).width = 30;
  worksheet.getColumn(8).width = 15;
  worksheet.getColumn(9).width = 15;
  worksheet.getColumn(10).width = 15;
  worksheet.getColumn(11).width = 15;
  worksheet.getColumn(12).width = 15;
  worksheet.getColumn(13).width = 15;

  const title = 'demo';
  let titleRow = worksheet.addRow([title]);

  // Set font, size and style in title row.
  titleRow.font = { name: 'sans-serif', family: 4, size: 20, bold: true };
  //titleRow.dimensions = { 10 };

  worksheet.addRow([]);
  worksheet.addRow([]);
  worksheet.addRow([]);
  worksheet.addRow([]);


  workbook.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, 'excel.xlsx');
  });
}
}
