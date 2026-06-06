import { useState } from "react";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import type { Pet } from "../../types/Pet";

function MyPets() {
  const [pets, setPets] = useState<Pet[]>([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const handleAddPet = () => {
    const newPet: Pet = {
      id: Date.now(),
      name,
      type,
      breed,
      gender,
      age: Number(age),
    };

    setPets([...pets, newPet]);

    setName("");
    setType("");
    setBreed("");
    setGender("");
    setAge("");
  };

  return (
    <>
      <DashboardNavbar />

      <h1>My Pets</h1>

      <p>Total Pets: {pets.length}</p>

      <hr />

      <h2>Add Pet</h2>

      <div>
        <label>Pet Name</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Pet Type</label>
        <br />
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Breed</label>
        <br />
        <input
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Gender</label>
        <br />
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Age</label>
        <br />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      <br />

      <button onClick={handleAddPet}>
        Add Pet
      </button>

      <hr />

      <h2>My Pet List</h2>

      {pets.map((pet) => (
        <div key={pet.id}>
          <h3>{pet.name}</h3>

          <p>Type: {pet.type}</p>
          <p>Breed: {pet.breed}</p>
          <p>Gender: {pet.gender}</p>
          <p>Age: {pet.age}</p>

          <hr />
        </div>
      ))}
    </>
  );
}

export default MyPets;