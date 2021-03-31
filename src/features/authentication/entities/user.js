export default class User {
  constructor(fullName, accountNumber, username) {
    this.fullName = fullName;
    this.accountNumber = accountNumber;
    this.username = username;
  }

  static fromJson(json) {
    return new User(
      json["responseObject"]["fullName"],
      json["responseObject"]["accountNumber"],
      json["responseObject"]["username"]
    );
  }
}
