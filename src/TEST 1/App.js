import React, { useState } from "react";
import Select from "react-select";
import { DESTINATIONS, RESOURCE_TYPES, SHIP_TYPES } from "./data/constants";
import ChargementIcon from "./assets/chargement.png";
import DechargementIcon from "./assets/dechargement.png";
import "./App.css";

export default function App() {
  const [location, setLocation] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [destination, setDestination] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [entries, setEntries] = useState([]);
  const [deliveryIdCounter, setDeliveryIdCounter] = useState(0);
  const [selectedShip, setSelectedShip] = useState(SHIP_TYPES[0]);

  // 🎨 Styles personnalisés pour les menus Select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      color: "black",
      width: "250px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "black",
      backgroundColor: state.isFocused ? "#eee" : "white",
    }),
    input: (provided) => ({
      ...provided,
      color: "black",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      width: "250px",
    }),
  };

  const handleAddEntry = () => {
    if (location && quantity && destination && selectedResource) {
      const newDeliveryId = deliveryIdCounter + 1;
      setDeliveryIdCounter(newDeliveryId);
      const parsedQuantity = parseFloat(quantity);

      const loadingEntry = {
        location: location.label,
        operation: "Chargement",
        quantity: parsedQuantity,
        resource: selectedResource.label,
        destination: destination.label,
        deliveryId: newDeliveryId,
      };

      const unloadingEntry = {
        location: destination.label,
        operation: "Déchargement",
        quantity: parsedQuantity,
        resource: selectedResource.label,
        destination: location.label,
        deliveryId: newDeliveryId,
      };

      const updatedEntries = [...entries];
      const addOperationToEntry = (loc, op) => {
        const existingEntry = updatedEntries.find(e => e.location === loc);
        if (existingEntry) {
          existingEntry.operations.push(op);
        } else {
          updatedEntries.push({ location: loc, operations: [op] });
        }
      };

      addOperationToEntry(location.label, loadingEntry);
      addOperationToEntry(destination.label, unloadingEntry);

      setEntries(updatedEntries);
      setLocation(null);
      setQuantity("");
      setDestination(null);
      setSelectedResource(null);
    }
  };

  const handleDeleteEntry = (deliveryIdToDelete) => {
    const updatedEntries = entries
      .map(entry => ({
        ...entry,
        operations: entry.operations.filter(op => op.deliveryId !== deliveryIdToDelete),
      }))
      .filter(entry => entry.operations.length > 0);

    setEntries(updatedEntries);
  };

  const moveUp = (index) => {
    if (index > 0) {
      const updatedEntries = [...entries];
      const [movedEntry] = updatedEntries.splice(index, 1);
      updatedEntries.splice(index - 1, 0, movedEntry);
      setEntries(updatedEntries);
    }
  };

  const moveDown = (index) => {
    if (index < entries.length - 1) {
      const updatedEntries = [...entries];
      const [movedEntry] = updatedEntries.splice(index, 1);
      updatedEntries.splice(index + 1, 0, movedEntry);
      setEntries(updatedEntries);
    }
  };

  const calculateResourceSummary = (location) => {
    let loadingQuantity = 0;
    let unloadingQuantity = 0;

    entries.forEach(entry => {
      if (entry.location === location) {
        entry.operations.forEach(op => {
          if (op.operation === "Chargement") loadingQuantity += op.quantity;
          if (op.operation === "Déchargement") unloadingQuantity += op.quantity;
        });
      }
    });

    return { loadingQuantity, unloadingQuantity };
  };

  const isOverloaded = (amount) => amount > selectedShip.maxCapacity;

  return (
    <div className="container">
      <h1 className="header">Planificateur de Cargaison</h1>
      <div className="main-content">
        <div className="form-container">
          <div className="form-group">
            <label>Vaisseau :</label>
            <Select
              value={selectedShip}
              onChange={setSelectedShip}
              options={SHIP_TYPES}
              getOptionLabel={(e) => `${e.label} (${e.maxCapacity} SCU)`}
              styles={customStyles}
            />
          </div>
          <div className="form-group">
            <label>Chargement depuis :</label>
            <Select
              value={location}
              onChange={setLocation}
              options={DESTINATIONS}
              styles={customStyles}
            />
          </div>
          <div className="form-group">
            <label>Quantité :</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="input-field"
	      style={{ width: "150px" }}
            />
          </div>
          <div className="form-group">
            <label>Ressource :</label>
            <Select
              value={selectedResource}
              onChange={setSelectedResource}
              options={RESOURCE_TYPES}
              styles={customStyles}
            />
          </div>
          <div className="form-group">
            <label>Destination :</label>
            <Select
              value={destination}
              onChange={setDestination}
              options={DESTINATIONS}
              styles={customStyles}
            />
          </div>
          <button className="add-button" onClick={handleAddEntry}>Ajouter</button>
        </div>

        <div className="quick-summary">
          <h2>Ordre des arrêts</h2>
          {entries.map((entry, idx) => {
            const { loadingQuantity, unloadingQuantity } = calculateResourceSummary(entry.location);
            return (
              <div key={idx} className="stop-order-entry">
                <div className="order-buttons">
                  {idx > 0 && <button onClick={() => moveUp(idx)} className="move-up-button"></button>}
                  {idx < entries.length - 1 && <button onClick={() => moveDown(idx)} className="move-down-button"></button>}
                </div>
                <span className="stop-location">{entry.location}</span>
                <div className="resource-summary">
                  <span>
                    <img src={ChargementIcon} alt="Chargement" className="icon" />
                    {loadingQuantity} SCU chargés
                  </span>
                  <span>
                    <img src={DechargementIcon} alt="Déchargement" className="icon" />
                    {unloadingQuantity} SCU déchargés
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="summary-container">
        {(() => {
          let currentCargo = 0;

          return entries.map((entry, idx) => {
            const cargoChange = entry.operations.reduce((sum, op) => {
              return sum + (op.operation === "Chargement" ? op.quantity : -op.quantity);
            }, 0);

            currentCargo += cargoChange;
            const overloaded = isOverloaded(currentCargo);

            return (
              <div key={idx} className="summary-entry">
                <h2>Arrêt {idx + 1} : {entry.location}</h2>
                {entry.operations.map((op, i) => (
                  <div key={i} className="operation-entry">
                    <p>
                      <strong>{op.operation}</strong> — {op.quantity} SCU de {op.resource} vers {op.destination}
                      <button className="delete-button" onClick={() => handleDeleteEntry(op.deliveryId)}>❌</button>
                    </p>
                  </div>
                ))}
                <div className="cargo-status">
                  <p>Charge : {currentCargo} SCU</p>
                  {overloaded && <p className="overload-warning">⚠️ Surcharge</p>}
                </div>
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
}
