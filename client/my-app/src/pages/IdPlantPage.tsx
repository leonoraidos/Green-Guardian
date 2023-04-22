import React, { useState } from 'react';
import { IPlantInfo } from '../types/plant';
import PlantCard from '../components/PlantCard';

interface Props {}

const PlantId: React.FC<Props> = () => {

  const [file, setFile] = useState<string | null>(null);
  const [plantInfo, setPlantInfo] = useState<IPlantInfo | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3001/idplant", {
      method: "POST",
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: file }),
    });

    const data = await response.json();
    console.log(data);
    setPlantInfo(data);
    setInputValue("");

  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setFile(reader.result);
        }
      };
    }
  };

  return (
    <>
    <div className="imageForm">
      <form className="form" onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} value={inputValue}/>
        <button type="submit">Identify Plant</button>
      </form>

    </div>
    <div>
      {plantInfo && <PlantCard plantInfo={plantInfo}/>}
    </div>

    </>

  );
};

export default PlantId;