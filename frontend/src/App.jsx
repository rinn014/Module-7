import { useState } from 'react'
import Sales_order from "./components/Sales_order"
import CM_management from "./components/CM_management"
import After_Sales from "./components/After_Sales"

function App() {

  return (
    <div>
      <h1>ERP Module 8: Sales & Customer Support Management</h1>

      {/* Function 1 */}
      <Sales_order />

      {/* Function 2 */}
      <CM_management />

      {/* Function 3 */}
      <After_Sales />

      {/* Function 4 */}
      
    </div>
  )
}

export default App
