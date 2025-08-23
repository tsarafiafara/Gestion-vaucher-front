// build-mdg-admin.js
// Construit { regions: [ { nom, districts: [ { nom, communes: [] } ] } ] } depuis SALB (ADM2)

import fs from "node:fs/promises";
import { readFileSync } from "node:fs";
const url = "https://geoservices.un.org/arcgis/rest/services/Hosted/SALB_MDG/FeatureServer/4/query"
  + "?where=1%3D1&outFields=ADM1NM%2CADM2NM&returnGeometry=false&f=pjson";

const res = await fetch(url);
if (!res.ok) throw new Error(`HTTP ${res.status} en lisant SALB`);
const data = await res.json();

const features = data.features || [];
// Regrouper par région
const byRegion = new Map();
for (const f of features) {
  const r = (f.attributes.ADM1NM || "").trim();
  const d = (f.attributes.ADM2NM || "").trim();
  if (!r || !d) continue;
  if (!byRegion.has(r)) byRegion.set(r, new Set());
  byRegion.get(r).add(d);
}

// Construire la structure finale
const regions = [...byRegion.keys()]
  .sort((a, b) => a.localeCompare(b, "fr"))
  .map(r => ({
    nom: r,
    districts: [...byRegion.get(r)]
      .sort((a, b) => a.localeCompare(b, "fr"))
      .map(d => ({ nom: d, communes: [] })), // communes à remplir dans l'étape 3
  }));
const csv = readFileSync("communes.csv", "utf-8").trim().split(/\r?\n/);
const header = csv.shift().split(",");
const idx = Object.fromEntries(header.map((h,i)=>[h.trim().toLowerCase(), i]));

for (const line of csv) {
  const cols = line.split(",");
  const reg = cols[idx.region]?.trim();
  const dis = cols[idx.district]?.trim();
  const com = cols[idx.commune]?.trim();
  if (!reg || !dis || !com) continue;

  const R = regions.find(r => r.nom === reg);
  const D = R?.districts.find(d => d.nom === dis);
  if (D) {
    if (!D.communes.includes(com)) D.communes.push(com);
  }
}
const out = { pays: "Madagascar", version: "SALB 2024-10-17", regions };

await fs.writeFile("madagascar-admin.json", JSON.stringify({ pays:"Madagascar", version:"SALB 2024-10-17 + communes CSV", regions }, null, 2));

console.log("✅ Fichier généré: madagascar-admin.json");

