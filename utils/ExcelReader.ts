import ExcelJS from 'exceljs';

export async function readExcelData(filePath: string, sheetName: string): Promise<any[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(sheetName);

  if (!worksheet) {
    throw new Error(`Sheet "${sheetName}" không tồn tại.`);
  }

  const rawData: any[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // Bỏ qua header

    const rowData: any = {};
    
    row.eachCell((cell, colNumber) => {
      if (colNumber === 1) rowData.name = cell.value;
      if (colNumber === 2) rowData.email = cell.value;
      if (colNumber === 3) rowData.password = cell.value;
    });

    rawData.push(rowData);
  });

  return rawData;
}