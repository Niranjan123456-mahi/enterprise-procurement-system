
/**
 * A highly reusable, Zoho-styled data table.
 * 
 * @param {Array} columns - Array of objects: { header: 'ID', accessor: row => row.id }
 * @param {Array} data - Array of data objects to render
 * @param {Function} onRowClick - Optional callback when a row is clicked
 */
export default function Table({ columns, data, onRowClick }) {
  return (
    <div className="zoho-card" style={{ padding: 0, overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        
        <thead style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
          <tr>
            {columns.map((col, index) => (
              <th 
                key={index} 
                style={{ 
                  padding: '16px 24px', 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  color: '#6b7280', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em' 
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody>
          {!data || data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: '32px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
                No records found.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                onClick={() => onRowClick && onRowClick(row)}
                style={{ 
                  borderBottom: '1px solid #f3f4f6', 
                  cursor: onRowClick ? 'pointer' : 'default',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => { if (onRowClick) e.currentTarget.style.backgroundColor = '#f9fafb'; }}
                onMouseLeave={(e) => { if (onRowClick) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} style={{ padding: '16px 24px', fontSize: '14px', color: '#111827' }}>
                    {col.accessor(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
        
      </table>
    </div>
  );
}