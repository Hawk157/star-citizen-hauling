import React, { useState } from 'react';
import './App.css';

// Lieux de chargement connus dans Star Citizen
const loadingPlaces = [
  'Everus Harbor', 'Port Tressler', 'Bajini Point', 'Orison', 'CRU-L1', 'CRU-L5',
  'MIC-L1', 'MIC-L2', 'HUR-L1', 'HUR-L5', 'ARC-L1', 'ARC-L5'
];

const resourceTypes = ['Hydrogen Fuel', 'Quantum Fuel', 'Ship Ammunition', 'Medical Supplies'];
const destinations = ['Port Tressler', 'Orison', 'Everus Harbor', 'CRU-L1', 'Bajini Point'];

function App() {
  const [contracts, setContracts] = useState([]);

  const addContract = () => {
    const newContract = {
      id: contracts.length + 1,
      lines: [
        {
          loadingPlace: '',
          quantity: '',
          resourceType: '',
          destination: ''
        }
      ]
    };
    setContracts([...contracts, newContract]);
  };

  const addLineToContract = (contractIdx) => {
    const updatedContracts = [...contracts];
    updatedContracts[contractIdx].lines.push({
      loadingPlace: '',
      quantity: '',
      resourceType: '',
      destination: ''
    });
    setContracts(updatedContracts);
  };

  const removeLine = (contractIdx, lineIdx) => {
    const updatedContracts = [...contracts];
    updatedContracts[contractIdx].lines.splice(lineIdx, 1);
    setContracts(updatedContracts);
  };

  const updateLineDetail = (contractIdx, lineIdx, field, value) => {
    const updatedContracts = [...contracts];
    updatedContracts[contractIdx].lines[lineIdx][field] = value;
    setContracts(updatedContracts);
  };

  return (
    <div className="app-container">
      <h1>Star Citizen Hauling Planner</h1>

      <button onClick={addContract}>+ Nouveau contrat</button>

      {contracts.map((contract, contractIdx) => (
        <div key={contract.id} className="contract-block">
          <h3>Contrat #{contract.id}</h3>

          {contract.lines.map((line, lineIdx) => (
            <div key={lineIdx} className="line-block">
              <select
                value={line.loadingPlace}
                onChange={(e) => updateLineDetail(contractIdx, lineIdx, 'loadingPlace', e.target.value)}
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
              />

              <select
                value={line.resourceType}
                onChange={(e) => updateLineDetail(contractIdx, lineIdx, 'resourceType', e.target.value)}
              >
                <option value="">-- Type de ressource --</option>
                {resourceTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={line.destination}
                onChange={(e) => updateLineDetail(contractIdx, lineIdx, 'destination', e.target.value)}
              >
                <option value="">-- Destination --</option>
                {destinations.map((dest) => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>

              <button
                className="delete-line-button"
                onClick={() => removeLine(contractIdx, lineIdx)}
                title="Supprimer cette ligne"
              >
                ✖
              </button>
            </div>
          ))}

          <button onClick={() => addLineToContract(contractIdx)} className="add-line-btn">
            + Ajouter une ligne
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
