import React, { useState } from "react";
import Select from "react-select";
import { Input, Button } from "@headlessui/react";

// Définir les types de vaisseaux
const SHIP_TYPES = [
  { value: "Hull C", label: "Hull C", maxCapacity: 4608 },
  { value: "Hull B", label: "Hull B", maxCapacity: 64 },
  { value: "StarLancer Max", label: "StarLancer Max", maxCapacity: 224 },
  { value: "Constellation Taurus", label: "Constellation Taurus", maxCapacity: 174 },
  { value: "Carrack", label: "Carrack", maxCapacity: 456 },
  { value: "Caterpillar", label: "Caterpillar", maxCapacity: 576 },
  { value: "Hercules C2", label: "Hercules C2", maxCapacity: 696 },

];

// Définir les destinations
const LOCATIONS = [
  { label: "Stations Orbitales", items: ["Baijini Point", "Everus Harbor", "Port Tressler", "Seraphim Station"] },
  { label: "Points de Lagrange", items: ["ARC-L1", "ARC-L2", "HUR-L1", "HUR-L2", "MIC-L1", "MIC-L2", "CRU-L1", "CRU-L2", "CRU-L4", "CRU-L5"] },
  { label: "Jump Points", items: ["Jump Point vers Pyro", "Jump Point vers Magnus", "Jump Point vers Terra"] }
];

const DESTINATIONS = LOCATIONS.flatMap(group => group.items.map(item => ({ value: item, label: item })));

// Définir les types de ressources
const RESOURCE_TYPES = [

  { value: "Agricium", label: "Agricium" },
  { value: "Agricium (Ore)", label: "Agricium (Ore)" },
  { value: "Aluminum", label: "Aluminum" },
  { value: "Aluminum (Ore)", label: "Aluminum (Ore)" },
  { value: "Borase", label: "Borase" },
  { value: "Borase (Ore)", label: "Borase (Ore)" },
  { value: "Carbon", label: "Carbon" },
  { value: "Cobalt", label: "Cobalt" },
  { value: "Copper", label: "Copper" },
  { value: "Copper (Ore)", label: "Copper (Ore)" },
  { value: "Gold", label: "Gold" },
  { value: "Gold (Ore)", label: "Gold (Ore)" },
  { value: "Iron", label: "Iron" },
  { value: "Iron (Ore)", label: "Iron (Ore)" },
  { value: "Mercury", label: "Mercury" },
  { value: "Riccite", label: "Riccite" },
  { value: "Silicon", label: "Silicon" },
  { value: "Stileron", label: "Stileron" },
  { value: "Tin", label: "Tin" },
  { value: "Titanium", label: "Titanium" },
  { value: "Titanium (Ore)", label: "Titanium (Ore)" },
  { value: "Tungsten", label: "Tungsten" },
  { value: "Tungsten (Ore)", label: "Tungsten (Ore)" },
  { value: "Xa' Pyen", label: "Xa' Pyen" },
  { value: "Agricultural Supplies", label: "Agricultural Supplies" },
  { value: "DCSR2", label: "DCSR2" },
  { value: "Ranta Dung", label: "Ranta Dung" },
  { value: "Altruciatoxin", label: "Altruciatoxin" },
  { value: "Distilled Spirits", label: "Distilled Spirits" },
  { value: "E'tam", label: "E'tam" },
  { value: "Gasping Weevil Eggs", label: "Gasping Weevil Eggs" },
  { value: "Maze", label: "Maze" },
  { value: "Neon", label: "Neon" },
  { value: "Osoian Hides", label: "Osoian Hides" },
  { value: "Revenant Tree Pollen", label: "Revenant Tree Pollen" },
  { value: "SLAM", label: "SLAM" },
  { value: "Stims", label: "Stims" },
  { value: "WiDow", label: "WiDow" },
  { value: "Ammonia", label: "Ammonia" },
  { value: "Argon", label: "Argon" },
  { value: "Astatine", label: "Astatine" },
  { value: "Chlorine", label: "Chlorine" },
  { value: "Fluorine", label: "Fluorine" },
  { value: "Helium", label: "Helium" },
  { value: "Hydrogen", label: "Hydrogen" },
  { value: "HydrogenFuel", label: "Hydrogen Fuel" },
  { value: "Iodine", label: "Iodine" },
  { value: "Methane", label: "Methane" },
  { value: "Nitrogen", label: "Nitrogen" },
  { value: "Partillium", label: "Partillium" },
  { value: "Pressurized Ice", label: "Pressurized Ice" },
  { value: "QuantumFuel", label: "Quantum Fuel" },
  { value: "Aphorite", label: "Aphorite" },
  { value: "Beryl", label: "Beryl" },
  { value: "Beryl (Raw)", label: "Beryl (Raw)" },
  { value: "Bexalite", label: "Bexalite" },
  { value: "Bexalite (Raw)", label: "Bexalite (Raw)" },
  { value: "Corundum", label: "Corundum" },
  { value: "Corundum (Raw)", label: "Corundum (Raw)" },
  { value: "Diamond", label: "Diamond" },
  { value: "Diamond (Raw)", label: "Diamond (Raw)" },
  { value: "Dolivine", label: "Dolivine" },
  { value: "Hadanite", label: "Hadanite" },
  { value: "Hephaestanite", label: "Hephaestanite" },
  { value: "Hephaestanite (Raw)", label: "Hephaestanite (Raw)" },
  { value: "Janalite", label: "Janalite" },
  { value: "Laranite", label: "Laranite" },
  { value: "Laranite (Raw)", label: "Laranite (Raw)" },
  { value: "Potassium", label: "Potassium" },
  { value: "Quantainium", label: "Quantainium" },
  { value: "Quantainium (Raw)", label: "Quantainium (Raw)" },
  { value: "Quartz", label: "Quartz" },
  { value: "Quartz (Raw)", label: "Quartz (Raw)" },
  { value: "Taranite", label: "Taranite" },
  { value: "Taranite (Raw)", label: "Taranite (Raw)" },
  { value: "Atlasium", label: "Atlasium" },
  { value: "Beradom", label: "Beradom" },
  { value: "Dymantium", label: "Dymantium" },
  { value: "Feynmaline", label: "Feynmaline" },
  { value: "Glacosite", label: "Glacosite" },
  { value: "Steel", label: "Steel" },
  { value: "Compboard", label: "Compboard" },
  { value: "Scrap", label: "Scrap" },
  { value: "Fresh Food", label: "Fresh Food" },
  { value: "Human Food Bars", label: "Human Food Bars" },
  { value: "Processed Food", label: "Processed Food" },
  { value: "Medical Supplies", label: "Medical Supplies" },
  { value: "Recycled Material Composite", label: "Recycled Material Composite" },
  { value: "Waste", label: "Waste" },
  { value: "Ship Ammunition", label: "Ship Ammunition" },


];

export default function App() {
  const [location, setLocation] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [destination, setDestination] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null); 
  const [entries, setEntries] = useState([]);
  const [deliveryIdCounter, setDeliveryIdCounter] = useState(0);
  const [selectedShip, setSelectedShip] = useState(SHIP_TYPES[0]);

  // Capacité maximale du vaisseau sélectionné
  const maxCapacity = selectedShip.maxCapacity;

  // Calculer l'état actuel du cargo pour chaque arrêt
  const getCargoStateForStop = (stopIndex) => {
    let cargo = 0;
    for (let i = 0; i <= stopIndex; i++) {
      const stop = entries[i];
      stop.operations.forEach(op => {
        cargo += op.operation === "Chargement" ? op.quantity : -op.quantity;
      });
    }
    return cargo;
  };

  const handleAddEntry = () => {
    if (location && quantity && destination && selectedResource) {
      const newDeliveryId = deliveryIdCounter + 1;
      setDeliveryIdCounter(newDeliveryId);

      const parsedQuantity = parseFloat(quantity);

      // Créer l'entrée pour le chargement
      const mainEntry = {
        location: location.label,  // Utiliser le label pour l'affichage
        operation: "Chargement",
        quantity: parsedQuantity,
        resource: selectedResource.label,  // Utiliser le label pour l'affichage
        destination: destination.label,
        deliveryId: newDeliveryId,
      };

      // Créer l'entrée pour le déchargement
      const returnEntry = {
        location: location.label,
        operation: "Déchargement",
        quantity: parsedQuantity,
        resource: selectedResource.label,
        destination: location.label, // Le déchargement retourne au lieu de départ
        deliveryId: newDeliveryId,
      };

      const updatedEntries = [...entries];
      const addOpToLocation = (loc, op) => {
        const idx = updatedEntries.findIndex(e => e.location === loc);
        if (idx >= 0) {
          updatedEntries[idx].operations.push(op);
        } else {
          updatedEntries.push({ location: loc, operations: [op] });
        }
      };

      // Ajouter d'abord le chargement, puis le déchargement
      addOpToLocation(location.label, mainEntry);
      addOpToLocation(destination.label, returnEntry);

      // Trier les opérations pour chaque arrêt : Déchargement après Chargement
      updatedEntries.forEach(e => {
        e.operations.sort((a, b) => (a.operation === "Chargement" ? -1 : 1));
      });

      setEntries(updatedEntries);
      setLocation(null);
      setQuantity("");
      setDestination(null);
      setSelectedResource(null); 
    }
  };

  const handleDeleteOperation = (deliveryId) => {
    const updated = entries
      .map(e => ({
        ...e,
        operations: e.operations.filter(op => op.deliveryId !== deliveryId),
      }))
      .filter(e => e.operations.length > 0);
    setEntries(updated);
  };

  const moveEntryUp = (i) => {
    if (i > 0) {
      const newEntries = [...entries];
      [newEntries[i - 1], newEntries[i]] = [newEntries[i], newEntries[i - 1]];
      setEntries(newEntries);
    }
  };

  const moveEntryDown = (i) => {
    if (i < entries.length - 1) {
      const newEntries = [...entries];
      [newEntries[i], newEntries[i + 1]] = [newEntries[i + 1], newEntries[i]];
      setEntries(newEntries);
    }
  };

  const generateSummary = () => {
    return entries.map((entry, idx) => {
      const totalForStop = entry.operations.reduce((acc, op) => acc + (op.operation === "Chargement" ? op.quantity : 0), 0);
      const cargoState = getCargoStateForStop(idx);

      return (
        <div key={idx} className="py-2">
          <div className="flex justify-between items-center">
            <p><strong>Arrêt #{idx + 1} :</strong></p>
            <div className="space-x-2">
              <Button onClick={() => moveEntryUp(idx)} className="bg-gray-300 px-2 py-1 rounded">⬆️</Button>
              <Button onClick={() => moveEntryDown(idx)} className="bg-gray-300 px-2 py-1 rounded">⬇️</Button>
            </div>
          </div>
          <p><strong>Lieu : </strong>{entry.location}</p>
          {entry.operations.sort((a, b) => (a.operation === "Chargement" ? -1 : 1)).map((op, i) => (
            <div key={i}>
              <p>
                <strong>Opération : </strong>{op.operation} |
                <strong> Quantité : </strong>{op.quantity} SCU |
                <strong> Ressource : </strong>{op.resource} | 
                <strong> Destination : </strong>{op.destination} |
                <strong> ID Livraison : </strong>{op.deliveryId}
              </p>
              <div className="flex space-x-2 mt-2">
                <Button onClick={() => handleDeleteOperation(op.deliveryId)} className="bg-red-500 text-white py-1 px-3 rounded-md">Supprimer cette opération</Button>
              </div>
            </div>
          ))}
          <p><strong>Total SCU chargé à cet arrêt : </strong>{totalForStop} SCU</p>
          <p><strong>État du cargo après cet arrêt : </strong>{cargoState} SCU</p>
          <hr />
        </div>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center">Planificateur de Cargaison</h1>

      <div className="border p-4 rounded-md shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center py-4">
          {/* Sélecteur de vaisseau */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Vaisseau</label>
            <Select
              value={selectedShip}
              onChange={(opt) => setSelectedShip(opt)}
              options={SHIP_TYPES}
              getOptionLabel={(e) => `${e.label} (${e.maxCapacity} SCU)`}
            />
          </div>

          {/* Sélecteur de lieu */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Lieu de Chargement</label>
            <Select
              value={location}
              onChange={(opt) => setLocation(opt)}
              options={DESTINATIONS}
            />
          </div>

          {/* Quantité */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantité</label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Sélecteur de ressource */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Ressource</label>
            <Select
              value={selectedResource}
              onChange={(opt) => setSelectedResource(opt)}
              options={RESOURCE_TYPES}
            />
          </div>

          {/* Sélecteur de destination */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Destination</label>
            <Select
              value={destination}
              onChange={(opt) => setDestination(opt)}
              options={DESTINATIONS}
            />
          </div>

          {/* Bouton Ajouter */}
          <div className="col-span-1 sm:col-span-2 flex items-center justify-center">
            <Button onClick={handleAddEntry} className="px-6 py-2 bg-blue-500 text-white rounded-md">Ajouter</Button>
          </div>
        </div>
      </div>

      {/* Affichage des arrêts et opérations */}
      <div className="space-y-4">{generateSummary()}</div>
    </div>
  );
}