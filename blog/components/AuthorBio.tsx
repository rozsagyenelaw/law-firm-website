export default function AuthorBio() {
  return (
    <div style={{
      margin: '20px auto',
      padding: '15px 20px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      borderLeft: '4px solid #8a6a2f',
      borderRadius: '8px',
      maxWidth: '800px'
    }}>
      <p style={{
        margin: 0,
        fontSize: '14px',
        color: '#2c3e50',
        lineHeight: 1.6
      }}>
        <strong style={{ color: '#1e3a5f' }}>Written by Rozsa Gyene, Esq.</strong><br />
        California State Bar #208356 | 25+ Years Probate & Estate Experience<br />
        <em style={{ color: '#6c757d' }}>Last Updated: January 28, 2025</em>
      </p>
    </div>
  )
}
