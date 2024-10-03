import React from 'react';

const DataTable = ({ columns, data }) => {
    console.log({data})
  return (
    
    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              style={{
                border: '1px solid #ddd',
                padding: '8px',
                backgroundColor: '#c0e3e5', // Blue
                color: '#322625', // Black
                textAlign: 'left',
              }}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} style={{ padding: '20px', textAlign: 'center' }}>
              No data available
            </td>
          </tr>
        ) : (
          data.map((item, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              {columns.map((col) => (
                <td key={col} style={{ padding: '8px', verticalAlign: 'top' }}>
                  {String(item[col]) || ''} {/* Render as string */}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
