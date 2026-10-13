#!/usr/bin/env node
// Builds src/data/routeGeometry.json: real road shapes for every drive leg in
// src/data/routes.ts, from OpenStreetMap via the public OSRM demo server.
//
//   npm run build:routes
//
// Only legs missing from the JSON are fetched; pass --all to refetch everything.

import { build } from 'esbuild';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const OUT = new URL('../src/data/routeGeometry.json', import.meta.url);
const OSRM = 'https://router.project-osrm.org/route/v1/driving/';
const TOLERANCE = 0.0006; // degrees (~65 m): smooth on screen, small file

const bundled = await build({
  entryPoints: [new URL('../src/data/routes.ts', import.meta.url).pathname],
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'node',
});
const routes = await import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString('base64')}`);
const { SCENARIOS, pointById, legKey } = routes;

const existing = existsSync(OUT) && !process.argv.includes('--all') ? JSON.parse(readFileSync(OUT, 'utf8')) : {};

// Douglas–Peucker line simplification.
const simplify = (points, tolerance) => {
  if (points.length < 3) return points;
  const sqTol = tolerance * tolerance;
  const sqSegDist = (p, a, b) => {
    let [x, y] = a;
    let dx = b[0] - x, dy = b[1] - y;
    if (dx || dy) {
      const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) [x, y] = b;
      else if (t > 0) { x += dx * t; y += dy * t; }
    }
    dx = p[0] - x; dy = p[1] - y;
    return dx * dx + dy * dy;
  };
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [first, last] = stack.pop();
    let maxDist = 0, index = 0;
    for (let i = first + 1; i < last; i++) {
      const d = sqSegDist(points[i], points[first], points[last]);
      if (d > maxDist) { maxDist = d; index = i; }
    }
    if (maxDist > sqTol) {
      keep[index] = 1;
      stack.push([first, index], [index, last]);
    }
  }
  return points.filter((_, i) => keep[i]);
};

const sleep = ms => new Promise(r => setTimeout(r, ms));
const result = { ...existing };
const legs = SCENARIOS.flatMap(s => s.legs).filter(l => l.mode === 'drive');
const unique = [...new Map(legs.map(l => [legKey(l), l])).values()];

for (const leg of unique) {
  const key = legKey(leg);
  if (result[key]) continue;
  const ids = [leg.from, ...(leg.via ?? []), leg.to];
  const coords = ids.map(id => {
    const point = pointById(id);
    if (!point) throw new Error(`Unknown point "${id}" in leg ${key}`);
    return point.coordinates.join(',');
  });
  const url = `${OSRM}${coords.join(';')}?overview=full&geometries=geojson`;
  const response = await fetch(url, { headers: { 'User-Agent': 'ixhuatan-and-beyond-route-builder/1.0' } });
  const data = await response.json();
  if (data.code !== 'Ok') throw new Error(`OSRM failed for ${key}: ${data.code} ${data.message ?? ''}`);
  const route = data.routes[0];
  const line = simplify(route.geometry.coordinates, TOLERANCE).map(([x, y]) => [+x.toFixed(4), +y.toFixed(4)]);
  result[key] = { km: Math.round(route.distance / 1000), coords: line };
  console.log(`${key}: ${result[key].km} km, ${route.geometry.coordinates.length} → ${line.length} points`);
  await sleep(1100); // be polite to the free demo server
}

writeFileSync(OUT, JSON.stringify(result));
console.log(`Wrote ${Object.keys(result).length} legs to ${OUT.pathname}`);
