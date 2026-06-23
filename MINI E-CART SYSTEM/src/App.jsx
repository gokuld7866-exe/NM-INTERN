import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
  useCallback,
} from "react";

const CartContext = createContext();

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Headphones", price: 2500 },
  { id: 3, name: "Smart Watch", price: 8000 },
  { id: 4, name: "Keyboard", price: 1800 },
  { id: 5, name: "Mouse", price: 1200 },
  { id: 6, name: "Speaker", price: 3500 },
];

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // useEffect
  useEffect(() => {
    console.log("Cart Updated:", cart);
  }, [cart]);

  // useCallback
  const addToCart = useCallback((product) => {
    setCart((prev) => [...prev, product]);
  }, []);

  // useCallback
  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // useMemo
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

function ProductList() {
  const { addToCart } = useContext(CartContext);

  // useRef
  const titleRef = useRef();

  useEffect(() => {
    titleRef.current.style.color = "#0d6efd";
  }, []);

  return (
    <>
      <h2 ref={titleRef}>Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <h3>{product.name}</h3>

            <h4>₹{product.price}</h4>

            <button
              className="add-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function Cart() {
  const { cart, removeFromCart, totalPrice } =
    useContext(CartContext);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <div>
              <strong>{item.name}</strong>
              <br />
              ₹{item.price}
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}

      <h2>Total : ₹{totalPrice}</h2>
    </div>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:Arial,sans-serif;
        }

        body{
          background:#f4f6f9;
        }

        .container{
          width:90%;
          max-width:1000px;
          margin:30px auto;
        }

        h1{
          text-align:center;
          color:#333;
          margin-bottom:25px;
        }

        h2{
          margin:20px 0;
        }

        .product-grid{
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
          gap:20px;
        }

        .card{
          background:white;
          border-radius:10px;
          padding:20px;
          text-align:center;
          box-shadow:0 2px 8px rgba(0,0,0,.2);
          transition:.3s;
        }

        .card:hover{
          transform:translateY(-5px);
        }

        .card h3{
          margin-bottom:10px;
        }

        .card h4{
          color:#0d6efd;
          margin-bottom:15px;
        }

        .add-btn{
          background:#28a745;
          color:white;
          border:none;
          padding:10px 20px;
          border-radius:5px;
          cursor:pointer;
        }

        .add-btn:hover{
          background:#218838;
        }

        .cart{
          margin-top:40px;
          background:white;
          padding:20px;
          border-radius:10px;
          box-shadow:0 2px 8px rgba(0,0,0,.2);
        }

        .cart-item{
          display:flex;
          justify-content:space-between;
          align-items:center;
          border-bottom:1px solid #ddd;
          padding:12px 0;
        }

        .remove-btn{
          background:#dc3545;
          color:white;
          border:none;
          padding:8px 16px;
          border-radius:5px;
          cursor:pointer;
        }

        .remove-btn:hover{
          background:#b02a37;
        }

        .cart h2:last-child{
          text-align:right;
          margin-top:20px;
          color:#0d6efd;
        }
      `}</style>

      <CartProvider>
        <div className="container">
          <h1>🛒 Mini E-Commerce Cart System</h1>

          <ProductList />

          <Cart />
        </div>
      </CartProvider>
    </>
  );
}