import { AREA_BY_KEY, type Vendor } from "./vendors";

/** Approximate outline of Liberia as (lon, lat) pairs, clockwise from the Mano River mouth. */
export const OUTLINE: [number, number][] = [
  [-11.5, 6.93], [-11.3, 7.21], [-11.1, 7.36], [-10.6, 7.76], [-10.32, 8.16], [-10.05, 8.52],
  [-9.76, 8.55], [-9.5, 8.36], [-9.42, 7.92], [-9.12, 7.76], [-8.92, 7.95], [-8.7, 7.7],
  [-8.48, 7.58], [-8.44, 7.34], [-8.6, 7.0], [-8.42, 6.86], [-8.3, 6.6], [-8.42, 6.36],
  [-8.2, 6.1], [-8.0, 5.82], [-7.8, 5.6], [-7.55, 5.3], [-7.44, 4.9], [-7.56, 4.55],
  [-7.72, 4.37], [-8.2, 4.55], [-8.8, 4.76], [-9.05, 5.0], [-9.6, 5.35], [-10.05, 5.88],
  [-10.4, 6.1], [-10.8, 6.31], [-11.05, 6.5], [-11.37, 6.75],
];

/** Project (lon, lat) into the 440x445 national map viewBox. */
export function project(lon: number, lat: number): [number, number] {
  return [(lon + 11.8) * 95 + 8, (8.8 - lat) * 95 + 8];
}

/** Project (lon, lat) into the 399x372 Greater Monrovia inset viewBox. */
export function projectMetro(lon: number, lat: number): [number, number] {
  return [(lon + 10.88) * 1500 + 12, (6.47 - lat) * 1500 + 12];
}

/** Great-circle distance in kilometres. */
export function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/** A vendor's best-known position: exact GPS when captured, otherwise its sales-area centroid. */
export function vendorLat(v: Vendor): number {
  return v.lat ?? AREA_BY_KEY[v.area].lat;
}
export function vendorLon(v: Vendor): number {
  return v.lon ?? AREA_BY_KEY[v.area].lon;
}

/** Google Maps hand-off: exact coordinates when we have them, landmark search otherwise. */
export function directionsUrl(v: Vendor): string {
  if (v.lat != null && v.lon != null) {
    return `https://www.google.com/maps/dir/?api=1&destination=${v.lat},${v.lon}`;
  }
  const query = `${v.landmark}, ${AREA_BY_KEY[v.area].hint}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
