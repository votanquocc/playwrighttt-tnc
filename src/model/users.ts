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
}