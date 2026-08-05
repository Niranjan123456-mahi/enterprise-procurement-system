import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table'; // Import the new reusable table

export default function POList() {
  const navigate = useNavigate();
  const [poData, setPoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated data fetch - replace with your actual API call later
  useEffect(() => {
    setTimeout(() => {
      setPoData([
        { id: 'PO-2026-001', vendor: 'LENOVE', amount: '$12,500.00', date: '2026-08-01', status: 'Issued' },
        { id: 'PO-2026-002', vendor: 'Dell Tech', amount: '$4,200.00', date: '2026-08-02', status: 'Pending Approval' },
        { id: 'PO-2026-003', vendor: 'Cisco Systems', amount: '$8,950.00', date: '2026-08-03', status: 'Delivered' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  // 1. Define your table columns
  // The 'accessor' determines what gets rendered in that specific cell for each row
  const columns = [
    { 
      header: 'PO Number', 
      accessor: (row) => <span style={{ fontWeight: '600', color: '#0284c7' }}>{row.id}</span> 
    },
    { 
      header: 'Vendor', 
      accessor: (row) => row.vendor 
    },
    { 
      header: 'Total Amount', 
      accessor: (row) => row.amount 
    },
    { 
      header: 'Issue Date', 
      accessor: (row) => row.date 
    },
    { 
      header: 'Status', 
      accessor: (row) => (
        <span style={{
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600',
          backgroundColor: row.status === 'Delivered' ? '#dcfce7' : row.status === 'Issued' ? '#fef08a' : '#f3f4f6',
          color: row.status === 'Delivered' ? '#166534' : row.status === 'Issued' ? '#854d0e' : '#374151'
        }}>
          {row.status}
        </span>
      ) 
    }
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', color: '#111827', margin: 0 }}>Purchase Orders</h2>
          <button style={{
            backgroundColor: '#0284c7', color: 'white', border: 'none', 
            padding: '10px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer'
          }}>
            + Create New PO
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>Loading Purchase Orders...</div>
        ) : (
          /* 2. Pass the columns and data into your Table component */
          <Table 
            columns={columns} 
            data={poData} 
            onRowClick={(row) => navigate(`/purchase-orders/${row.id}`)} 
          />
        )}

      </div>
    </div>
  );
}