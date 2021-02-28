import '98.css'

const Error = () => (
  <div
    style={{
      height: '90vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div style={{ width: 300 }} className="window">
      <div className="title-bar">
        <div className="title-bar-text">oh-no.exe</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div className="window-body">
        <p style={{ textAlign: 'center' }}>Sorry, our servers are not responding right now.</p>
        <p style={{ textAlign: 'center' }}>Please try again later!</p>
        <div className="field-row" style={{ justifyContent: 'center' }}>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    </div>
  </div>
)

export default Error
