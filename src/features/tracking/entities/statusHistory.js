export default class StatusHistory {
  constructor(description, date) {
    this.description = description;
    this.date = date;
  }

  static fromJson(json) {
    return new StatusHistory(json["description"], json["data"]);
  }
}
