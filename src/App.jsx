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
  //Constantes
  const MAX_QUANTITY = 5; // se coloca el maximo de elementos que se pueden tener en el carrito
  const MIN_QUANTITY = 1; // se coloca el minimo de elementos que se pueden tener en el carrito
  //funciones
  function addToCart(items) {
    // console.log("anadiendo");
    // lo que hace es buscar si el item ya existe en el carrito
    const itemsExist = cart.findIndex((guitar) => guitar.id === items.id);
    // Revisamos si el item existe
    if (itemsExist >= 0) {
      // Revisamos si la cantidad de items es mayor o igual a 5
      if (cart[itemsExist].quantity >= MAX_QUANTITY) return
      /*se pudo haber hecho asi:
      cart[itemsExist].quantity++; ❌ pero no se debe debido a que esto muta el objecto original y no se debe hacer
      por lo que se hace de la siguiente manera:
      */
      const updateCart = [...cart];
      updateCart[itemsExist].quantity++;
      setCart(updateCart);
      /*esto se hace con el fin de que no se mute el objecto original la cual esta no es la debida manera de hacerlo correctamente
      para eso existe el Set del respectivo estado*/
      //alert("ya existe");
    } else {
      items.quantity = 1;
      setCart([...cart, items]);
      //alert("lo añadiste");
    }
    // itemsExist >= 0
    //   ? // si ya existe
    //     alert("ya existe")
    //   : (items.quantity = 1)    setCart([...cart, items]), alert("lo añadiste");
  }

  function removeFromCart(id) {
    // const cartFilter = cart.filter((guitar) => guitar.id !== id);
    // setCart(cartFilter);
    setCart(cart.filter((guitar) => guitar.id !== id));
    // console.log("eliminando" + id);
  }

  function increaseQuantity(id) {
    /* lo que hace es con el metodo map se va a iterar por todos los elementos del carito que se tienen guardandolos en updateCart
    y en el va a buscar el id el cual concuerde en el que se esta dando click, se hace una copia de lo que se tiene del items, pero la quantity se actualizara en 1, retornando dicho item con el fin de no modificar el state del item */
    const updateCart = cart.map((item) => {
      //se coloca el max_quantity para que no se pueda pasar de 5 elementos, este se coloca en const para tener un mejor control del codigo, mejorando la legibilidad, teniendo un codigo mas limpio
      if (item.id === id && item.quantity < MAX_QUANTITY) {
        return {
          ...item,/*
          item.quantity += 1,
          item.quantity = item.quantity + 1, ❌ no se debe hacer debido a que esto muta el objecto original y no se debe hacer
          item.quantity ++ ❌ no se debe hacer debido a que esto muta el objecto original y no se debe hacer  
          */
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  }

  function decreaseQuantity(id) {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_QUANTITY) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }
      return item;
    });
    setCart(updateCart);
  }

  function clearCart() {
    setCart([]);
  }
  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
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
