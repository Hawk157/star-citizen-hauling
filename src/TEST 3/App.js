import React, { useState } from 'react';
import './App.css';

const ships = [
{ name: '890 Jump', capacity: 950 },
{ name: 'A2 Hercules', capacity: 234 },
{ name: 'Carrack', capacity: 456 },
{ name: 'C2 Hercules', capacity: 696 },
{ name: 'Caterpillar', capacity: 576 },
{ name: 'Caterpillar Pirate Edition', capacity: 564 },
{ name: 'Constellation Andromeda', capacity: 96 },
{ name: 'Constellation Aquila', capacity: 96 },
{ name: 'Constellation Phoenix', capacity: 96 },
{ name: 'Constellation Phoenix Emerald', capacity: 96 },
{ name: 'Constellation Taurus', capacity: 168 },
{ name: 'Corsair', capacity: 72 },
{ name: 'Cutlass Black', capacity: 46 },
{ name: 'Freelancer', capacity: 66 },
{ name: 'Freelancer MAX', capacity: 120 },
{ name: 'Hull A', capacity: 64 },
{ name: 'M2 Hercules', capacity: 468 },
{ name: 'Mercury Star Runner', capacity: 114 },
{ name: '600i Explorer', capacity: 40 },
{ name: 'StarLancer MAX', capacity: 224 },
];

const loadingPlaces = ['Seraphim Station',
'Everus Harbor',
'Baijini Point',
'Port Tressler',
'ARC-L1',
'ARC-L3',
'ARC-L4',
'ARC-L5',
'CRU-L1',
'CRU-L3',
'CRU-L4',
'CRU-L5',
'HUR-L1',
'HUR-L2',
'HUR-L3',
'HUR-L4',
'HUR-L5',
'MIC-L2',
'MIC-L3',
'MIC-L4',
'MIC-L5',
'JP vers Pyro',
'JP vers Magnus',
'JP vers Terra',
'Afterlife',
'ArcCorp Mining Area 045',
'ArcCorp Mining Area 048',
'ArcCorp Mining Area 056',
'ArcCorp Mining Area 061',
'ArcCorp Mining Area 141',
'ArcCorp Mining Area 157',
'Archibald Station',
'Arid Reach',
'Ashland',
'Benson Mining Outpost',
'Blackrock Exchange',
'Bountiful Harvest Hydroponics',
'Bud Growery',
'Bueno Ravine',
'Bullocks Reach',
'Canard View',
'Carvers Ridge',
'Chawlas Beach',
'Connors',
'Deakins Research Outpost',
'Dingers Depot',
'Elsewhere',
'Fallow Field',
'FEO Canyon Depot',
'Frigid Knot',
'Gallete Family Farms',
'Goners Deal',
'Good Times Temple',
'Gray Gardens Depot',
'HDMS-Bezdek',
'HDMS-Edmond',
'HDMS-Hadley',
'HDMS-Hahn',
'HDMS-Lathan',
'HDMS-Norgaard',
'HDMS-Oparei',
'HDMS-Perlman',
'HDMS-Pinewood',
'HDMS-Ryder',
'HDMS-Stanhope',
'HDMS-Thedus',
'Hickes Research Outpost',
'HSOF-Palomar',
'Humboldt Mines',
'Jacksons Swap',
'Kabirs Post',
'Kinder Plots',
'Kudre Ore',
'Last Ditch',
'Last Landings',
'Lost and Found',
'Loveridge Mineral Reserve',
'MT DataCenter 2UB-RB9-5',
'MT DataCenter 4HJ-LVE-A',
'MT DataCenter 5WQ-R2V-C',
'MT DataCenter 8FK-Q2X-K',
'MT DataCenter D79-ECG-R',
'MT DataCenter E2Q-NSG-Y',
'MT DataCenter KH3-AAE-L',
'MT DataCenter L8P-JUC-8 (offline)',
'MT DataCenter QVX-J88-J',
'MT DataCenter TMG-XEV-2',
'MT OpCenter TLI-4',
'Narenas Rest',
'NT-999-XVI',
'NT-999-XX',
'NT-999-XXII',
'Nuen Waste Management',
'Ostlers Claim',
'Outpost 54',
'Prophets Peak',
'Prospect Depot',
'Rayari Anvik Research Outpost',
'Rayari Cantwell Research Outpost',
'Rayari Deltana Research Outpost',
'Rayari Kaltag Research Outpost',
'Rayari Livengood Research Outpost',
'Rayari McGrath Research Outpost',
'Rough Landing',
'Rustville',
'Sacrens Plot',
'Scarpers Turn',
'Security Depot Lyria-1',
'Security Post Criska',
'Security Post Dipur',
'Security Post Lespin',
'Security Post Moluto',
'Security Post Opal',
'Security Post Prashad',
'Security Post Thaquray',
'Security Post Wan',
'Seers Canyon',
'Shady Glen Farms',
'Shepherds Rest',
'Shubin Mining Facility SAL-2',
'Shubin Mining Facility SAL-5',
'Shubin Mining Facility SCD-1',
'Shubin Mining Facility SM0-10',
'Shubin Mining Facility SM0-13',
'Shubin Mining Facility SM0-18',
'Shubin Mining Facility SM0-22',
'Shubin Mining Facility SMCa-6',
'Shubin Mining Facility SMCa-8',
'Shubin Processing Facility SPAL-12',
'Shubin Processing Facility SPAL-16',
'Shubin Processing Facility SPAL-21',
'Shubin Processing Facility SPAL-3',
'Shubin Processing Facility SPAL-7',
'Shubin Processing Facility SPAL-9',
'Shubin Processing Facility SPMC-1',
'Shubin Processing Facility SPMC-10',
'Shubin Processing Facility SPMC-11',
'Shubin Processing Facility SPMC-14',
'Shubin Processing Facility SPMC-3',
'Shubin Processing Facility SPMC-5',
'Slowburn Depot',
'Stags Rut',
'Stash House (Cellin)',
'Stonetree',
'Sunset Mesa',
'Supply Gap',
'Talarine Divide Aid Shelter',
'Teddys Playhouse',
'Terra Mills HydroFarm',
'The Garden',
'The Golden Riviera',
'The Necropolis',
'The Orphanage',
'The Pit',
'The Yard',
'TPF',
'Tram & Myers Mining',
'Unnamed abandoned outpost (Cellin)',
'Unnamed abandoned outpost (Daymar)',
'Unnamed abandoned outpost (Yela)',
'Utopia',
'Washout',
'Watchers Depot',
'Wheelers',
'Wiley Flats',
'Windfall',
'Yangs Place',
];

const resourceTypes = [
  'Agricium',
  'Agricium (Ore)',
  'Aluminum',
  'Aluminum (Ore)',
  'Borase',
  'Borase (Ore)',
  'Carbon',
  'Cobalt',
  'Copper',
  'Copper (Ore)',
  'Gold',
  'Gold (Ore)',
  'Iron',
  'Iron (Ore)',
  'Mercury',
  'Riccite',
  'Silicon',
  'Stileron',
  'Tin',
  'Titanium',
  'Titanium (Ore)',
  'Tungsten',
  'Tungsten (Ore)',
  "Xa' Pyen",
  'Agricultural Supplies',
  'DCSR2',
  'Ranta Dung',
  'Altruciatoxin',
  'Distilled Spirits',
  'E\'tam',
  'Gasping Weevil Eggs',
  'Maze',
  'Neon',
  'Osoian Hides',
  'Revenant Tree Pollen',
  'SLAM',
  'Stims',
  'WiDow',
  'Ammonia',
  'Argon',
  'Astatine',
  'Chlorine',
  'Fluorine',
  'Helium',
  'Hydrogen',
  'HydrogenFuel',
  'Iodine',
  'Methane',
  'Nitrogen',
  'Partillium',
  'Pressurized Ice',
  'QuantumFuel',
  'Aphorite',
  'Beryl',
  'Beryl (Raw)',
  'Bexalite',
  'Bexalite (Raw)',
  'Corundum',
  'Corundum (Raw)',
  'Diamond',
  'Diamond (Raw)',
  'Dolivine',
  'Hadanite',
  'Hephaestanite',
  'Hephaestanite (Raw)',
  'Janalite',
  'Laranite',
  'Laranite (Raw)',
  'Potassium',
  'Quantainium',
  'Quantainium (Raw)',
  'Quartz',
  'Quartz (Raw)',
  'Taranite',
  'Taranite (Raw)',
  'Atlasium',
  'Beradom',
  'Dymantium',
  'Feynmaline',
  'Glacosite',
  'Steel',
  'Compboard',
  'Scrap',
  'Fresh Food',
  'Human Food Bars',
  'Processed Food',
  'Medical Supplies',
  'Recycled Material Composite',
  'Waste',
  'Ship Ammunition'
];
const destinations = [
'Seraphim Station',
'Everus Harbor',
'Baijini Point',
'Port Tressler',
'ARC-L1',
'ARC-L3',
'ARC-L4',
'ARC-L5',
'CRU-L1',
'CRU-L3',
'CRU-L4',
'CRU-L5',
'HUR-L1',
'HUR-L2',
'HUR-L3',
'HUR-L4',
'HUR-L5',
'MIC-L2',
'MIC-L3',
'MIC-L4',
'MIC-L5',
'JP vers Pyro',
'JP vers Magnus',
'JP vers Terra'];

function App() {
  const [contracts, setContracts] = useState([]);
  const [summaryLines, setSummaryLines] = useState([]);
  const [selectedShip, setSelectedShip] = useState(null);
  const [shipCapacity, setShipCapacity] = useState(0);

  const addContract = () => {
    const newContract = {
      id: contracts.length + 1,
      lines: [{
        loadingPlace: '',
        quantity: '',
        resourceType: '',
        destination: '',
        isValid: false,
        lineId: Date.now()
      }]
    };
    setContracts([...contracts, newContract]);
  };

  const addLineToContract = (contractIdx) => {
    const updatedContracts = [...contracts];
    updatedContracts[contractIdx].lines.push({
      loadingPlace: '',
      quantity: '',
      resourceType: '',
      destination: '',
      isValid: false,
      lineId: Date.now()
    });
    setContracts(updatedContracts);
  };

  const removeLine = (contractIdx, lineIdx) => {
    const updatedContracts = [...contracts];
    const removedLineId = updatedContracts[contractIdx].lines[lineIdx].lineId;
    updatedContracts[contractIdx].lines.splice(lineIdx, 1);

    if (updatedContracts[contractIdx].lines.length === 0) {
      updatedContracts.splice(contractIdx, 1);
    }

    setContracts(updatedContracts);
    removeSummaryLine(removedLineId);
  };

  const removeSummaryLine = (removedLineId) => {
    const updatedSummary = [...summaryLines];
    updatedSummary.forEach((step) => {
      if (step.lines) {
        step.lines = step.lines.filter((line) => line.lineId !== removedLineId);
      }
    });
    const cleanedSummary = updatedSummary.filter(step => step.lines && step.lines.length > 0);
    setSummaryLines(cleanedSummary);
  };

  const updateLineDetail = (contractIdx, lineIdx, field, value) => {
    const updatedContracts = [...contracts];
    updatedContracts[contractIdx].lines[lineIdx][field] = value;
    setContracts(updatedContracts);
  };

  const validateLine = (contractIdx, lineIdx) => {
    const updatedContracts = [...contracts];
    const line = updatedContracts[contractIdx].lines[lineIdx];

    if (line.loadingPlace && line.quantity && line.resourceType && line.destination) {
      updatedContracts[contractIdx].lines[lineIdx].isValid = true;
      setContracts(updatedContracts);

      const newSummary = [...summaryLines];

      let loadingStep = newSummary.find(step => step.loadingPlace === line.loadingPlace);
      if (!loadingStep) {
        newSummary.push({
          loadingPlace: line.loadingPlace,
          lines: []
        });
        loadingStep = newSummary[newSummary.length - 1];
      }
      loadingStep.lines.push({
        text: `Chargez ${line.quantity} SCU de ${line.resourceType} à destination de ${line.destination} (Contrat #${contractIdx + 1})`,
        lineId: line.lineId
      });

      let unloadingStep = newSummary.find(step => step.loadingPlace === line.destination);
      if (!unloadingStep) {
        newSummary.push({
          loadingPlace: line.destination,
          lines: []
        });
        unloadingStep = newSummary[newSummary.length - 1];
      }
      unloadingStep.lines.push({
        text: `Déchargez ${line.quantity} SCU de ${line.resourceType} en provenance de ${line.loadingPlace} (Contrat #${contractIdx + 1})`,
        lineId: line.lineId
      });

      setSummaryLines(newSummary);
    } else {
      alert('Veuillez remplir tous les champs avant de valider.');
    }
  };

  const moveLine = (index, direction) => {
    const updated = [...summaryLines];
    const target = index + direction;
    if (target < 0 || target >= summaryLines.length) return;
    [updated[index], updated[target]] = [updated[target], updated[index]];
    setSummaryLines(updated);
  };

  const handleShipChange = (event) => {
    const selectedShipName = event.target.value;
    const ship = ships.find((ship) => ship.name === selectedShipName);
    if (ship) {
      setSelectedShip(ship.name);
      setShipCapacity(ship.capacity);
    }
  };

  const calculateCargoProgression = (steps) => {
    let currentCargo = 0;
    const progression = [];

    for (let i = 0; i < steps.length - 1; i++) {
      const currentStep = steps[i];
      const nextStep = steps[i + 1];

      currentStep.lines.forEach((line) => {
        if (line.text.startsWith('Chargez')) {
          const quantity = parseInt(line.text.match(/(\d+)\sSCU/)[1]);
          currentCargo += quantity;
        } else if (line.text.startsWith('Déchargez')) {
          const quantity = parseInt(line.text.match(/(\d+)\sSCU/)[1]);
          currentCargo -= quantity;
        }
      });

      progression.push({
        from: currentStep.loadingPlace,
        to: nextStep.loadingPlace,
        cargo: currentCargo,
        overCapacity: currentCargo > shipCapacity
      });
    }

    return progression;
  };

  return (
    <div className="app-container">
      <h1>Star Citizen Hauling Planner</h1>

      <div className="ship-selection">
        <label htmlFor="ship-select">Sélectionner un vaisseau :</label>
        <select id="ship-select" onChange={handleShipChange}>
          <option value="">-- Sélectionner un vaisseau --</option>
          {ships.map((ship) => (
            <option key={ship.name} value={ship.name}>{ship.name}</option>
          ))}
        </select>
        {selectedShip && (
          <div className="ship-capacity">
            Capacité du vaisseau sélectionné : {shipCapacity} SCU
          </div>
        )}
      </div>

      <div className="summary-section">
        <h2>Résumé des opérations</h2>
        <ul className="summary-list">
          {summaryLines.length > 0 ? (() => {
            const progression = calculateCargoProgression(summaryLines);
            return summaryLines.map((step, index) => (
              <li key={index} className="summary-step">
                <h3>{step.loadingPlace}</h3>
                <ul>
                  {step.lines.map((line, lineIndex) => (
                    <li key={lineIndex} className="summary-line">
                      <span>{line.text}</span>
                      <div className="move-buttons">
                        <button onClick={() => moveLine(index, -1)} title="Monter cette ligne" className="move-line-button move-up-button"></button>
                        <button onClick={() => moveLine(index, 1)} title="Descendre cette ligne" className="move-line-button move-down-button"></button>
                      </div>
                    </li>
                  ))}
                </ul>
                {index < summaryLines.length - 1 && (
                  <div className={`cargo-info ${progression[index].overCapacity ? 'over-capacity' : ''}`}>
                    ➔ Entre {step.loadingPlace} et {summaryLines[index + 1].loadingPlace} : <strong>{progression[index].cargo} SCU</strong> en soute
                    {progression[index].overCapacity && (
                      <span className="warning-text"> ⚠ Dépasse la capacité maximale du vaisseau !</span>
                    )}
                  </div>
                )}
              </li>
            ));
          })() : (
            <li>Aucune ligne de chargement pour le moment.</li>
          )}
        </ul>
      </div>

      <button onClick={addContract}>+ Nouveau contrat</button>

      {contracts.map((contract, contractIdx) => (
        <div key={contract.id} className="contract-block">
          <h3>Contrat #{contract.id}</h3>

          {contract.lines.map((line, lineIdx) => (
            <div key={line.lineId} className="line-block">
              <select
                value={line.loadingPlace}
                onChange={(e) => updateLineDetail(contractIdx, lineIdx, 'loadingPlace', e.target.value)}
                disabled={line.isValid}
              >
                <option value="">-- Lieu de chargement --</option>
                {loadingPlaces.map((place) => (
                  <option key={place} value={place}>{place}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Quantité de SCU"
                value={line.quantity}
                onChange={(e) => updateLineDetail(contractIdx, lineIdx, 'quantity', e.target.value)}
                disabled={line.isValid}
              />

              <select
                value={line.resourceType}
                onChange={(e) => updateLineDetail(contractIdx, lineIdx, 'resourceType', e.target.value)}
                disabled={line.isValid}
              >
                <option value="">-- Type de ressource --</option>
                {resourceTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={line.destination}
                onChange={(e) => updateLineDetail(contractIdx, lineIdx, 'destination', e.target.value)}
                disabled={line.isValid}
              >
                <option value="">-- Destination --</option>
                {destinations.map((dest) => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>

              <button
                className="validate-line-button"
                onClick={() => validateLine(contractIdx, lineIdx)}
                disabled={line.isValid}
              >
                Valider
              </button>

              <button
                className="delete-line-button"
                onClick={() => removeLine(contractIdx, lineIdx)}
                title="Supprimer cette ligne"
              >
                ✖
              </button>
            </div>
          ))}

          <button onClick={() => addLineToContract(contractIdx)} title="Ajouter une ligne">
            + Ajouter une ligne
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
