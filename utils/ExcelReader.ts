import ExcelJS from 'exceljs';

export async function readExcelData(filePath: string, sheetName: string): Promise<any[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(sheetName);

  if (!worksheet) {
    throw new Error(`Sheet "${sheetName}" không tồn tại.`);
  }

  const headerRow = worksheet.getRow(1);
  if (!headerRow || headerRow.cellCount === 0) {
    throw new Error('Sheet không có header ở dòng đầu tiên.');
  }

  const rows: any[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const rowData: any = {};
    row.eachCell((cell, colNumber) => {
      const header = headerRow.getCell(colNumber).value;
      rowData[header as string] = cell.value;
    });
    rows.push(rowData);
  });

  return rows;
}
