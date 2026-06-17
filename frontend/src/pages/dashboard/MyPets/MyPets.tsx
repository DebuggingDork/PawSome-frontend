import { useState } from "react";
import type { Pet } from "../../../types/Pet";
import "./MyPets.css";

/**
 * MyPets component allows users to register their pets by inputting details,
 * lists all current pets, and provides the ability to delete pets.
 */
function MyPets() {
  // 1. STATE MANAGEMENT
  // Array of pets stored in the component's state
  const [pets, setPets] = useState<Pet[]>([]);

  // Form input fields state
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  // 2. HELPER FUNCTIONS
  /**
   * Helper function to return an appropriate emoji based on the pet's type.
   * This enhances visual appeal and user experience.
   */
  const getPetEmoji = (petType: string): string => {
    const normalized = petType.toLowerCase().trim();
    if (normalized.includes("dog")) return "🐶";
    if (normalized.includes("cat")) return "🐱";
    if (normalized.includes("bird")) return "🐦";
    if (normalized.includes("fish")) return "🐟";
    if (normalized.includes("rabbit") || normalized.includes("bunny")) return "🐰";
    if (normalized.includes("hamster") || normalized.includes("mouse") || normalized.includes("rat")) return "🐹";
    if (normalized.includes("reptile") || normalized.includes("snake") || normalized.includes("lizard")) return "🦎";
    if (normalized.includes("horse")) return "🐴";
    return "🐾"; // Default icon
  };

  // 3. EVENT HANDLERS
  /**
   * Validates form fields, constructs a new Pet object, updates the state list,
   * and clears all form input fields.
   */
  const handleAddPet = () => {
    // Trim values to ensure they are not empty spaces
    const trimmedName = name.trim();
    const trimmedType = type.trim();
    const trimmedBreed = breed.trim();
    const trimmedGender = gender.trim();
    const trimmedAge = age.trim();

    // Validation check: Prevent submission if any field is empty
    if (!trimmedName || !trimmedType || !trimmedBreed || !trimmedGender || !trimmedAge) {
      alert("Please fill in all required fields (Name, Type, Breed, Gender, and Age).");
      return;
    }

    // Age validation: Ensure age is a non-negative number
    const ageNum = Number(trimmedAge);
    if (isNaN(ageNum) || ageNum < 0) {
      alert("Please enter a valid age.");
      return;
    }

    // Construct the new Pet object adhering to the Pet interface
    const newPet: Pet = {
      id: Date.now(), // Generate a unique identifier using the current timestamp
      name: trimmedName,
      type: trimmedType,
      breed: trimmedBreed,
      gender: trimmedGender,
      age: ageNum,
    };

    // Update the state array immediately with the new pet
    setPets((prevPets) => [...prevPets, newPet]);

    // Clear all form fields after successful addition
    setName("");
    setType("");
    setBreed("");
    setGender("");
    setAge("");
  };

  /**
   * Filters out the selected pet from state based on its unique id,
   * which updates the list and total count immediately.
   */
  const handleDeletePet = (id: number) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
  };

  // 4. COMPONENT RENDER
  return (
    <div className="mypets-container">
      {/* Header section displaying title and dynamic total pet count */}
      <header className="mypets-header">
        <div className="mypets-title-section">
          <h1>My Pets</h1>
          <p className="mypets-subtitle">Manage and list your furry or feathered friends</p>
        </div>
        <div className="mypets-stats">
          <span>Total Pets</span>
          <span className="mypets-stats-number">{pets.length}</span>
        </div>
      </header>

      <div className="mypets-layout">
        {/* Add Pet Form Card */}
        <aside className="mypets-form-card">
          <h2>Add Pet</h2>
          
          <div className="form-group">
            <label htmlFor="petName">Pet Name</label>
            <input
              id="petName"
              type="text"
              className="form-input"
              placeholder="e.g. Bella"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="petType">Pet Type</label>
            <input
              id="petType"
              type="text"
              className="form-input"
              placeholder="e.g. Dog, Cat, Rabbit"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="petBreed">Breed</label>
            <input
              id="petBreed"
              type="text"
              className="form-input"
              placeholder="e.g. Golden Retriever"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="petGender">Gender</label>
            <input
              id="petGender"
              type="text"
              className="form-input"
              placeholder="e.g. Female, Male"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="petAge">Age (years)</label>
            <input
              id="petAge"
              type="number"
              min="0"
              className="form-input"
              placeholder="e.g. 2"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button className="btn-submit" onClick={handleAddPet}>
            <span>+</span> Add Pet
          </button>
        </aside>

        {/* View Pets Section */}
        <main className="mypets-list-section">
          <h2>My Pet List</h2>

          {/* Conditional Rendering: Show empty state if there are no pets */}
          {pets.length === 0 ? (
            <div className="mypets-empty-state">
              <div className="mypets-empty-icon">🐾</div>
              <h3>No pets added yet</h3>
              <p>Fill out the form on the left to add your first pet!</p>
            </div>
          ) : (
            <div className="pets-grid">
              {/* Loop through state array using map() to render cards */}
              {pets.map((pet) => (
                <div key={pet.id} className="pet-card">
                  <div className="pet-card-header">
                    <div className="pet-avatar-wrapper">
                      <div className="pet-emoji" aria-hidden="true">
                        {getPetEmoji(pet.type)}
                      </div>
                      <div>
                        <h3 className="pet-card-title">{pet.name}</h3>
                        <p className="pet-breed-subtitle">{pet.breed}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pet-details-grid">
                    <div className="pet-detail-item">
                      <span className="pet-detail-label">Type</span>
                      <span className="pet-detail-value">{pet.type}</span>
                    </div>
                    <div className="pet-detail-item">
                      <span className="pet-detail-label">Gender</span>
                      <span className="pet-detail-value">{pet.gender}</span>
                    </div>
                    <div className="pet-detail-item">
                      <span className="pet-detail-label">Age</span>
                      <span className="pet-detail-value">
                        {pet.age} {pet.age === 1 ? "year" : "years"}
                      </span>
                    </div>
                  </div>

                  {/* Delete pet button invoking deletion handler */}
                  <button
                    className="btn-delete"
                    onClick={() => handleDeletePet(pet.id)}
                    aria-label={`Delete ${pet.name}`}
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default MyPets;