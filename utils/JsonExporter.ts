import * as fs from 'fs';
import * as path from 'path';

export class JsonExporter {
  /**
   * Xuất data ra file JSON
   */
  public static exportToFile(data: any[], outputFilePath: string): void {
    const outputDir = path.dirname(outputFilePath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(outputFilePath, jsonString, 'utf8');
    
    console.log(`✅ Đã xuất ${data.length} bản ghi ra: ${outputFilePath}`);
  }
}