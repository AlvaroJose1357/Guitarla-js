import "./App.css";
import { useState, useEffect } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";

//data
import { db } from "./data/db";

function App() {
  // State
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  //Effect // Simula la carga de datos de una api o base de datos externa(En este caso la base de datos es un archivo js)
  useEffect(() => {
    setData(db);
  }, []);
  //funciones
  function addToCart(items) {
    // console.log("anadiendo");
    const itemsExist = cart.findIndex((guitar) => guitar.id === items.id);
    console.log(itemsExist);
    // Revisamos si el item existe
    if (itemsExist >= 0) {
      /*se pudo haber hecho asi:
      cart[itemsExist].quantity++; ❌ pero no se debe debido a que esto muta el objecto original y no se debe hacer
      por lo que se hace de la siguiente manera:
      */
      const updateCart = [...cart];
      updateCart[itemsExist].quantity++;
      setCart(updateCart);
      /*esto se hace con el fin de que no se mute el objecto original la cual esta no es la debida manera de hacerlo correctamente
      para eso existe el Set del respectivo estado*/
      alert("ya existe");
    } else {
      items.quantity = 1;
      setCart([...cart, items]);
      alert("lo añadiste");
    }
    // itemsExist >= 0
    //   ? // si ya existe
    //     alert("ya existe")
    //   : (items.quantity = 1)    setCart([...cart, items]), alert("lo añadiste");
  }
  return (
    <>
      <Header cart={cart} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              //se utiliza key para que no haya problema con alun elemento repetido
              key={guitar.id}
              // objeto que contiene la información de una guitarra individual
              guitar={guitar}
              // función que se utiliza para actualizar el estado cart. Este estado representa el carrito de compras en la aplicación.
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
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
