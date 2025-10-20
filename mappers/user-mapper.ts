import { User } from '../src/model/users';

export class UserMapper {
  /**
   * Map raw data sang User objects
   */
  public static mapToUsers(rawData: any[]): User[] {
    return rawData.map(data => User.fromJSON(data));
  }

  /**
   * Map raw data sang JSON string
   */
  public static mapToJson(rawData: any[]): string {
    const users = this.mapToUsers(rawData);
    return JSON.stringify(users, null, 2);
  }
}