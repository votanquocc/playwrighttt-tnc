import { readExcelData } from './utils/ExcelReader';
import { UserMapper } from './mappers/user-mapper';
import { JsonExporter } from './utils/JsonExporter';

export async function Json() {
  try {
    // Flow: Excel Reader → Mapper → JSON → User Model
    console.log('=== BẮT ĐẦU XỬ LÝ ===');
    
    // 1. Đọc Excel
    console.log('📖 Đang đọc Excel...');
    const rawData = await readExcelData('./src/data/xlsx/userdata.xlsx', 'Users');
    console.log(`📊 Đọc được ${rawData.length} bản ghi`);

    // 2. Map sang User
    console.log('🔄 Đang map sang User...');
    const users = UserMapper.mapToUsers(rawData);
    console.log(`👥 Đã map thành ${users.length} users`);

    // 3. Xuất JSON
    console.log('💾 Đang xuất JSON...');
    JsonExporter.exportToFile(users, './src/data/json/users.json');
    
    console.log('🎉 HOÀN THÀNH!');

  } catch (error) {
    console.error('❌ Lỗi:', error);
  }
}
if (require.main === module) {
  Json();
}