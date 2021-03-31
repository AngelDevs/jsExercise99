export default class PendingPackage {
  constructor(
    description,
    weight,
    priceToPay,
    supplier,
    courier,
    courierTracking,
    internalTracking
  ) {
    this.description = description;
    this.weight = weight;
    this.priceToPay = priceToPay;
    this.supplier = supplier;
    this.courier = courier;
    this.courierTracking = courierTracking;
    this.internalTracking = internalTracking;
  }

  static fromJson(json) {
    return new PendingPackage(
      json["description"],
      json["weight"],
      json["priceToPay"],
      json["supplier"],
      json["courier"],
      json["courierTracking"],
      json["internalTracking"]
    );
  }
}
