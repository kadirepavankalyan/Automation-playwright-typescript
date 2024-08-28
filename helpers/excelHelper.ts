import ExcelJS from 'exceljs';

export async function getDataFromExcel(filePath: string, sheetName: string): Promise<any[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(sheetName);

    if (!worksheet) {
        throw new Error(`Worksheet "${sheetName}" not found in file "${filePath}".`);
    }

    const data: any[] = [];
    const headers: string[] = [];

    worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell, colNumber) => {
        headers[colNumber - 1] = cell.value as string;
    });

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        if (rowNumber === 1) return; // Skip the header row
        const rowData: any = {};
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            rowData[headers[colNumber - 1]] = cell.value;
        });
        data.push(rowData);
    });

    return data;
}
