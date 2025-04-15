import React, { useState } from 'react';
import './App.css';
import Select from 'react-select';

import { ships, loadingPlaces, resourceTypes, destinations } from './data';

function App() {
  const [contracts, setContracts] = useState([]);
  const [summaryLines, setSummaryLines] = useState([]);
  const [selectedShip, setSelectedShip] = useState(null);
  const [shipCapacity, setShipCapacity] = useState(0);
  const [loadedCargo, setLoadedCargo] = useState(0);

  const addContract = () => {
    const newContract = {
      id: contracts.length + 1,
      lines: [createEmptyLine()],
    };
    setContracts([...contracts, newContract]);
  };

  const createEmptyLine = () => ({
    loadingPlace: '',
    quantity: '',
    resourceType: '',
    destination: '',
    isValid: false,
    lineId: Date.now(),
  });

  const addLineToContract = (contractIdx) => {
    const updatedContracts = [...contracts];
    updatedContracts[contractIdx].lines.push(createEmptyLine());
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
    const updatedSummary = summaryLines
      .map((step) => ({
        ...step,
        lines: step.lines.filter((line) => line.line.lineId !== removedLineId),
      }))
      .filter((step) => step.lines.length > 0);
    setSummaryLines(updatedSummary);
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
      line.isValid = true;
      setContracts(updatedContracts);

      const newSummary = [...summaryLines];

      const addOrUpdateStep = (place, text, lineRef, type) => {
        let step = newSummary.find((s) => s.loadingPlace === place);
        if (!step) {
          step = { loadingPlace: place, lines: [] };
          newSummary.push(step);
        }
        step.lines.push({ text, line: lineRef, isCargoInHold: false, type });
      };

      addOrUpdateStep(
        line.loadingPlace,
        `Chargez ${line.quantity} SCU de ${line.resourceType} à destination de ${line.destination} (Contrat #${contractIdx + 1})`,
        line,
        'loading'
      );
      addOrUpdateStep(
        line.destination,
        `Déchargez ${line.quantity} SCU de ${line.resourceType} en provenance de ${line.loadingPlace} (Contrat #${contractIdx + 1})`,
        line,
        'unloading'
      );

      setSummaryLines(newSummary);
    } else {
      alert('Veuillez remplir tous les champs avant de valider.');
    }
  };

  const handleShipChange = (selectedOption) => {
    const ship = ships.find((s) => s.name === selectedOption.value);
    if (ship) {
      setSelectedShip(ship.name);
      setShipCapacity(ship.capacity);
    }
  };

  const moveStep = (index, direction) => {
    const newSummary = [...summaryLines];
    const step = newSummary[index];
    newSummary.splice(index, 1);
    newSummary.splice(index + direction, 0, step);
    setSummaryLines(newSummary);
  };

  const getShipOptions = () => ships.map((ship) => ({ value: ship.name, label: ship.name }));
  const getSelectOptions = (options) => options.map((option) => ({ value: option, label: option }));

  const customSelectStyle = {
    container: (provided) => ({ ...provided, width: '275px' }),
    option: (provided) => ({ ...provided, color: 'black' }),
  };

  const customResourceSelectStyle = {
    container: (provided) => ({ ...provided, width: '220px' }),
    option: (provided) => ({ ...provided, color: 'black' }),
  };

  const handleCargoInHoldChange = (stepIdx, lineIdx, isChecked) => {
    const updatedSummary = [...summaryLines];
    const lineEntry = updatedSummary[stepIdx].lines[lineIdx];
    const quantity = parseInt(lineEntry.line.quantity) || 0;

    if (lineEntry.type === 'loading') {
      setLoadedCargo((prev) => prev + (isChecked ? quantity : -quantity));
    } else if (lineEntry.type === 'unloading') {
      setLoadedCargo((prev) => prev - (isChecked ? quantity : -quantity));
    }

    lineEntry.isCargoInHold = isChecked;
    setSummaryLines(updatedSummary);
  };

  return (
    <div className="app-container">
      <h1>Star Citizen Hauling Planner</h1>

      <div className="ship-selection">
        <label htmlFor="ship-select">Sélectionner un vaisseau :</label>
        <Select
          id="ship-select"
          options={getShipOptions()}
          onChange={handleShipChange}
          placeholder="Sélectionner un vaisseau"
          styles={customSelectStyle}
        />
        {selectedShip && <div className="ship-capacity">Capacité : {shipCapacity} SCU</div>}
      </div>

      <div className="cargo-info">
        <h2>Cargo en soute: {loadedCargo} SCU</h2>
        {loadedCargo > shipCapacity && <div className="over-capacity">Attention: Capacité excédée!</div>}
      </div>

      <div className="summary-section">
        <h2>Résumé des opérations</h2>
        <ul className="summary-list">
          {summaryLines.length ? summaryLines.map((step, i) => {
            const totalLoad = step.lines
              .filter(line => line.type === 'loading')
              .reduce((acc, line) => acc + parseInt(line.line.quantity || 0), 0);

            const isOverloaded = totalLoad > shipCapacity;

            return (
              <li key={i} className="summary-step" style={{ border: '2px solid #ccc', padding: '10px', marginBottom: '15px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                <div className="move-buttons" style={{ marginRight: '15px', display: 'flex', flexDirection: 'column' }}>
                  <button className="move-up-button" onClick={() => moveStep(i, -1)}>▲</button>
                  <button className="move-down-button" onClick={() => moveStep(i, 1)}>▼</button>
                </div>
                <div>
                  <h3>{step.loadingPlace}</h3>
                  <ul>
                    {step.lines.map((lineEntry, j) => (
  <li key={j} className="summary-line" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <span>{lineEntry.text}</span>
    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      {lineEntry.type === 'unloading' ? 'Livré' : 'Chargé'}
      <input
        type="checkbox"
        checked={lineEntry.isCargoInHold}
        onChange={(e) => handleCargoInHoldChange(i, j, e.target.checked)}
      />
    </label>
  </li>
))}

                  </ul>
                  {isOverloaded && (
                    <div style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
                      ⚠️ Capacité excédée à cette étape ({totalLoad} SCU > {shipCapacity} SCU)
                    </div>
                  )}
                </div>
              </li>
            );
          }) : <li>Aucune ligne pour le moment.</li>}
        </ul>
      </div>

      {/* Le reste du code reste inchangé */}
      {contracts.map((contract, ci) => (
        <div key={contract.id} className="contract-block">
          <h3>Contrat #{contract.id}</h3>
          {contract.lines.map((line, li) => (
            <div key={line.lineId} className="line-block">
              <Select
                value={line.loadingPlace ? { value: line.loadingPlace, label: line.loadingPlace } : null}
                onChange={(e) => updateLineDetail(ci, li, 'loadingPlace', e.value)}
                options={getSelectOptions(loadingPlaces)}
                placeholder="Lieu de chargement"
                isDisabled={line.isValid}
                styles={customSelectStyle}
              />

              <input
                type="text"
                placeholder="Quantité"
                value={line.quantity}
                onChange={(e) => updateLineDetail(ci, li, 'quantity', e.target.value)}
                disabled={line.isValid}
              />

              <Select
                value={line.resourceType ? { value: line.resourceType, label: line.resourceType } : null}
                onChange={(e) => updateLineDetail(ci, li, 'resourceType', e.value)}
                options={getSelectOptions(resourceTypes)}
                placeholder="Ressource"
                isDisabled={line.isValid}
                styles={customResourceSelectStyle}
              />

              <Select
                value={line.destination ? { value: line.destination, label: line.destination } : null}
                onChange={(e) => updateLineDetail(ci, li, 'destination', e.value)}
                options={getSelectOptions(destinations)}
                placeholder="Destination"
                isDisabled={line.isValid}
                styles={customSelectStyle}
              />

              <button className="validate-line-button" onClick={() => validateLine(ci, li)} disabled={line.isValid}>Valider</button>
              <button className="delete-line-button" onClick={() => removeLine(ci, li)}>✖</button>
            </div>
          ))}
          <button onClick={() => addLineToContract(ci)}>+ Ajouter une ligne</button>
        </div>
      ))}

      <button onClick={addContract} className="new-contract-button">Nouveau contrat</button>
    </div>
  );
}

export default App;