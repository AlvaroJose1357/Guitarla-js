import "./App.css";
import { useState, useEffect } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";

//data
import { db } from "./data/db";

function App() {
  // State
  const [data, setData] = useState([]);
  //Effect // Simula la carga de datos de una api o base de datos externa(En este caso la base de datos es un archivo js)
  useEffect(() => {
    setData(db);
  }, []);
  console.log(db);
  return (
    <>
      <Header />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          <Guitar />
        </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
