import { useMemo } from "react";
export default function Header({ cart, removeFromCart }) {
  /*Se crea una función isEmpty que retorna true si el carrito esta vacio y false si no lo esta
  State Derivado => es un estado que se deriva de otro estado. En este caso, el estado cart se deriva para saber si esta vacio o no.
  el state derivado se puede hacer de las siguientes maneras:
  1. Se puede hacer con una función que se ejecute cada vez que el estado cambie
  const isEmpty = () => cart.length === 0;
  2. se puede hacer en tipo de variable que se actualice cada vez que el estado cambie
  const cartTotal = cart.reduce(
    (total, items) => total + items.quantity * items.price,
    0
  );
  lo mas recomendable es hacerlo con una función ya que se ejecuta cada vez que el estado cambie y no se tiene que estar actualizando la variable cada vez que el estado cambie ya que se hace automaticamente con la función y se actualiza el estado cart
  3. con useMemo que es un hook que se utiliza para memorizar un valor y solo se actualiza cuando sus dependencias cambian*/
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () =>
      cart.reduce((total, items) => total + items.quantity * items.price, 0),
    [cart]
  );
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {
                  // <!-- Carrito vacio-->
                  isEmpty ? (
                    <p className="text-center">El carrito esta vacio</p>
                  ) : (
                    // <!-- Carrito con productos-->
                    <>
                      <table className="w-100 table">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((guitar) => (
                            <tr key={guitar.id}>
                              <td>
                                <img
                                  className="img-fluid"
                                  src={`/img/${guitar.image}.jpg`}
                                  alt="imagen guitarra"
                                />
                              </td>
                              <td>{guitar.name}</td>
                              <td className="fw-bold">${[guitar.price]}</td>
                              <td className="flex align-items-start gap-4">
                                <button type="button" className="btn btn-dark">
                                  -
                                </button>
                                {guitar.quantity}
                                <button type="button" className="btn btn-dark">
                                  +
                                </button>
                              </td>
                              <td>
                                <button
                                  onClick={() => {
                                    removeFromCart(guitar.id);
                                  }}
                                  className="btn btn-danger"
                                  type="button"
                                >
                                  X
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="text-end">
                        Total pagar:{" "}
                        <span className="fw-bold">${cartTotal}</span>
                      </p>
                      <button className="btn btn-dark w-100 mt-3 p-2">
                        Vaciar Carrito
                      </button>
                    </>
                  )
                }
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
