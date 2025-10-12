import { useState } from "react";
import "../Module_8style/Sales_order.css"; // ✅ We'll create this file next

function App() {
  const customers = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
  ];

  const products = [
    { id: 1, name: "Product A", price: 100, stock: 10 },
    { id: 2, name: "Product B", price: 200, stock: 5 },
  ];

  const [orders, setOrders] = useState([
    // Example dummy order
    { id: 1, customerId: 1, productId: 1, quantity: 2, discount: 10, tax: 12, status: "pending", totalAmount: "196.80", invoiceStatus: "unpaid" },
  ]);
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
      invoiceStatus: "unpaid"
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

  const updateInvoiceStatus = (id, invoiceStatus) => {
    setOrders(
      orders.map((o) =>
        o.id === id ? { ...o, invoiceStatus } : o
      )
    );
  };

  const generateInvoice = (order) => {
    alert(
      `Invoice Generated:\nCustomer: ${customers.find((c) => c.id === order.customerId)?.name}\nProduct: ${products.find((p) => p.id === order.productId)?.name}`
    );
  };

  return (
    <div className="container">
      <h2>Sales Order Management</h2>
      <div className="form-card">
        <label>Customer</label>
        <select
          value={newOrder.customerId}
          onChange={(e) => setNewOrder({ ...newOrder, customerId: e.target.value })}
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <label>Product</label>
        <select
          value={newOrder.productId}
          onChange={(e) => setNewOrder({ ...newOrder, productId: e.target.value })}
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock})</option>
          ))}
        </select>
        <label>Quantity</label>
        <input
          type="number"
          min={1}
          value={newOrder.quantity}
          onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })}
        />
        <label>Discount (%)</label>
        <input
          type="number"
          min={0}
          value={newOrder.discount}
          onChange={(e) => setNewOrder({ ...newOrder, discount: parseInt(e.target.value) })}
        />
        <label>Tax (%)</label>
        <input
          type="number"
          min={0}
          value={newOrder.tax}
          onChange={(e) => setNewOrder({ ...newOrder, tax: parseInt(e.target.value) })}
        />
        <button onClick={createOrder}>Create Order / Quotation</button>
      </div>
      <h3>Orders / Quotations</h3>
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.map((o) => (
        <div key={o.id} className="order-card">
          <p>
            <strong>Order #{o.id}</strong><br />
            Customer: {customers.find((c) => c.id === o.customerId)?.name}<br />
            Product: {products.find((p) => p.id === o.productId)?.name}<br />
            Quantity: {o.quantity}<br />
            Discount: {o.discount}%<br />
            Tax: {o.tax}%<br />
            Status: {o.status}<br />
            Total Amount: ${o.totalAmount}<br />
            Invoice Status: {o.invoiceStatus}
          </p>
          <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}>
            <option value="pending">pending</option>
            <option value="processed">processed</option>
            <option value="shipped">shipped</option>
            <option value="delivered">delivered</option>
          </select>
          <select value={o.invoiceStatus} onChange={e => updateInvoiceStatus(o.id, e.target.value)}>
            <option value="unpaid">unpaid</option>
            <option value="paid">paid</option>
          </select>
          <button onClick={() => generateInvoice(o)}>Generate Invoice</button>
        </div>
      ))}
    </div>
  );
}

export default App;
