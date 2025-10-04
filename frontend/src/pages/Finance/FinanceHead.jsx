import React from 'react'

export default function FinanceHead() {
  return (
    <div className='p-5'>
            <h1 className='justify-items-center m-5'>Finance Statements</h1>
            <nav className="flex gap-6 mb-5 text-blue-700 justify-center">
              <p className="cursor-pointer hover:underline ">General Ledger</p>
              <p className="cursor-pointer hover:underline">Accounts Payable (Supplier)</p>
              <p className="cursor-pointer hover:underline">Accounts Receivable (Customer)</p>
              <p className="cursor-pointer hover:underline">Reports and Compliance</p>
              <p className="cursor-pointer hover:underline">Employee Payroll (HR)</p>
            </nav>
            <table className="table-auto w-full border border-gray-400 border-collapse [&_*]:border [&_*]:border-gray-400 [&_*]:px-4 [&_*]:py-2">
               <thead className="bg-gray-100"> {/*Ilalagay Sa for loop based on how many iterations  ang napupurchase through procurement*/}
                <tr> 
                  <th>Test</th>
                  <th>Test</th>
                  <th>Test</th>
                  <th>Test</th>
                  <th>Test</th>
                </tr>
              </thead>
              <tr>
                <td>Test</td>
                <td>Test</td>
                <td>Test</td>
                <td>Test</td>
                <td>Test</td>
              </tr>
            </table>
    </div>
  )
}
