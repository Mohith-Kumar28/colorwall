'use client'

import Link from 'next/link'

export default function BeforeLogin() {
  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <Link 
        href="/" 
        style={{ 
          display: 'inline-block',
          padding: '8px 16px',
          border: '2px solid #000',
          borderRadius: '4px',
          textDecoration: 'none',
          color: '#000',
          fontWeight: '500'
        }}
      >
        ← Back to Homepage
      </Link>
    </div>
  )
}
