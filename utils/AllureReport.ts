import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const resultsPath = path.resolve(__dirname, '../allure-results');
const reportPath = path.resolve(__dirname, '../allure-report');
const historyBackupPath = path.resolve(__dirname, '../allure-history');

// Copy history from backup to results
function restoreHistory() {
  const source = path.join(historyBackupPath, 'history');
  const destination = path.join(resultsPath, 'history');
  if (fs.existsSync(source)) {
    fs.cpSync(source, destination, { recursive: true });
    console.log('📂 Đã copy history vào allure-results');
  }
}

// Backup history from report
function backupHistory() {
  const source = path.join(reportPath, 'history');
  const destination = path.join(historyBackupPath, 'history');
  if (fs.existsSync(source)) {
    fs.rmSync(destination, { recursive: true, force: true });
    fs.cpSync(source, destination, { recursive: true });
    console.log('💾 Đã backup history từ allure-report');
  }
}

export default async () => {
  restoreHistory();

  console.log('📊 Đang tạo Allure Report...');
  execSync(`npx allure generate ${resultsPath} --clean -o ${reportPath}`, { stdio: 'inherit' });

  backupHistory();

  // console.log('🚀 Đang mở Allure Report...');
  // execSync(`npx allure open ${reportPath}`, { stdio: 'inherit' });
};
