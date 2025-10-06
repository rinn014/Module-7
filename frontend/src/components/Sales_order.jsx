import { useState } from "react";
import "./Module_8style/Sales_order.css"; // ✅ We'll create this file next

function App() {
  const customers = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
  ];

  const products = [
    { id: 1, name: "Product A", price: 100 },
    { id: 2, name: "Product B", price: 200 },
  ];

  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    customerId: "",
    productId: "",
    quantity: 1,
    discount: 0,
    tax: 12,
    status: "pending",
  });

  const createOrder = () => {
    const product = products.find((p) => p.id === parseInt(newOrder.productId));
    if (!product || !newOrder.customerId) {
      alert("Select customer and product!");
      return;
    }

    const baseAmount = product.price * newOrder.quantity;
    const discountAmount = (baseAmount * newOrder.discount) / 100;
    const taxedAmount = (baseAmount - discountAmount) * (newOrder.tax / 100);
    const totalAmount = baseAmount - discountAmount + taxedAmount;

    const newOrderData = {
      id: orders.length + 1,
      customerId: parseInt(newOrder.customerId),
      productId: parseInt(newOrder.productId),
      quantity: newOrder.quantity,
      discount: newOrder.discount,
      tax: newOrder.tax,
      status: newOrder.status,
      totalAmount: totalAmount.toFixed(2),
    };

    setOrders([...orders, newOrderData]);
    alert("Order/Quotation Created!");
  };

  const updateStatus = (id, status) => {
    setOrders(
      orders.map((o) =>
        o.id === id ? { ...o, status: status } : o
      )
    );
  };

  const generateInvoice = (order) => {
    alert(
      `Invoice Generated:
Customer: ${customers.find((c) => c.id === order.customerId)?.name}
Product: ${products.find((p) => p.id === order.productId)?.name}
Total: $${order.totalAmount}
Linked to Inventory & Finance`
    );
  };
//interfaces
  return (
    <div className="container">
      <h2>Sales Order Management</h2>

      <div className="form-card">
        <h3>Create Quotation / Order</h3>

        <label>Customer</label>
        <select
          value={newOrder.customerId}
          onChange={(e) =>
            setNewOrder({ ...newOrder, customerId: e.target.value })
          }
        >
          <option value="">Select customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <label>Product</label>
        <select
          value={newOrder.productId}
          onChange={(e) =>
            setNewOrder({ ...newOrder, productId: e.target.value })
          }
        >
          <option value="">Select product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} - ${p.price}
            </option>
          ))}
        </select>

        <label>Quantity</label>
        <input
          type="number"
          value={newOrder.quantity}
          onChange={(e) =>
            setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })
          }
        />

        <label>Discount (%)</label>
        <input
          type="number"
          value={newOrder.discount}
          onChange={(e) =>
            setNewOrder({ ...newOrder, discount: parseFloat(e.target.value) })
          }
        />

        <label>Tax (%)</label>
        <input
          type="number"
          value={newOrder.tax}
          onChange={(e) =>
            setNewOrder({ ...newOrder, tax: parseFloat(e.target.value) })
          }
        />

        <button className="btn-primary" onClick={createOrder}>
          Create Order
        </button>
      </div>

      <h3>Orders</h3>
      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <p>
            <strong>Order #{order.id}</strong> <br />
            Customer: {customers.find((c) => c.id === order.customerId)?.name} <br />
            Product: {products.find((p) => p.id === order.productId)?.name} <br />
            Qty: {order.quantity} <br />
            Discount: {order.discount}% <br />
            Tax: {order.tax}% <br />
            Total: ${order.totalAmount} <br />
            Status: <span className="status">{order.status}</span>
          </p>

          <select
            value={order.status}
            onChange={(e) => updateStatus(order.id, e.target.value)}
          >
            <option value="pending">pending</option>
            <option value="processed">processed</option>
            <option value="shipped">shipped</option>
            <option value="delivered">delivered</option>
          </select>

          <button className="btn-secondary" onClick={() => generateInvoice(order)}>
            Generate Invoice
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
