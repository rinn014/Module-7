import { useState } from "react";

function Sales_order() {
  // ✅ Dummy Customers
  const customers = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
  ];

  // ✅ Dummy Product List
  const products = [
    { id: 1, name: "Product A", price: 100 },
    { id: 2, name: "Product B", price: 200 },
  ];

  // ✅ Orders State
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customerId: "",
    productId: "",
    quantity: 1,
    discount: 0, // % discount
    tax: 12, // % tax
    status: "pending",
  });
  return(
    <p>Hello</p>
  )
}
