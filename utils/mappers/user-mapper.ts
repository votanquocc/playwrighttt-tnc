// src/utils/ExcelReader.ts
import { User } from '../../src/model/users';

export function mapRowToUser(row: any): User {
  return new User(
    String(row['username']),
    String(row['email']),
    String(row['password'])
  );
}
