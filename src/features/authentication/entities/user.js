export default class User {
  constructor(fullName, accountNumber) {
    this.fullName = fullName;
    this.accountNumber = accountNumber;
  }

  fromJson(json) {
    return new User(json["fullName"], json["accountNumber"]);
  }
}
