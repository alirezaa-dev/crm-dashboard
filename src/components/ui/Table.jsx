import React from 'react'

export default function Table() {
  return (
    <div>
        <table className="w-full text-right">
          <thead>
            <tr className="">
              <th className="px-4 py-2 border-b border-border">شماره</th>
              <th className="px-4 py-2 border-b border-border">نام و نام خانوادگی</th>
              <th className="px-4 py-2 border-b border-border">امتیاز</th>
              <th className="px-4 py-2 border-b border-border">تاریخ عضویت</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-4 py-2 border-b border-border">{customer.id}</td>
                <td className="px-4 py-2 border-b border-border">{customer.name}</td>
                <td className="px-4 py-2 border-b border-border">{customer.score}</td>
                <td className="px-4 py-2 border-b border-border">{customer.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}
