import * as fs from 'fs';
import * as path from 'path';
export class User {
  public name: string;
  public email: string;
  public password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  public static fromJSON(json: any): User {
    return new User(json.name, json.email, json.password);
  }

  public static loadUsers(): User[] {
    const testDataPath = path.join(__dirname, '../data/json/users.json');
    const usersData = JSON.parse(fs.readFileSync(testDataPath,'utf-8'));
    return usersData.map((data: any) => User.fromJSON(data));
  }
}