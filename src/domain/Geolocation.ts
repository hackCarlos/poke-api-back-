export class Geolocation {
  readonly lattitude: number;
  readonly longitude: number;

  constructor({
    lattitude,
    longitude,
  }: {
    lattitude: number;
    longitude: number;
  }) {
    this.lattitude = lattitude;
    this.longitude = longitude;
  }
}
