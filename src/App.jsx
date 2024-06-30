import "./App.css";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { useCart } from "./hooks/useCart";


function App() {
  const { data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal } = useCart();
  
  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
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
              // // función que se utiliza para actualizar el estado cart. Este estado representa el carrito de compras en la aplicación.
              // ya no se utiliza debido a que se actualizo hacia un custom hook useCart
              // setCart={setCart}
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
