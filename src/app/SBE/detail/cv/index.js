import Header from './templates/header'
import DetailSection from './templates/detail-section'
import styles from './templates/styles'

const contactDetails = {
  sectionIcon: 'person',
  title: 'Contact Details',
  attributes: ['PRI_NAME', 'PRI_MOBILE', 'PRI_EMAIL', 'PRI_ADDRESS_FULL'],
}

const Cv = ({ sbeCode }) => {
  return (
    <div style={styles.container}>
      <Header />
      <DetailSection details={contactDetails} />
      <div style={{ background: 'tomato', display: 'flex', flexGrow: '1', padding: '1em' }}>
        <div style={{ background: 'red', padding: '1em 2em 0 2em' }}>{`two`}</div>
        <div
          style={{
            background: 'blue',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: '1',
            paddingTop: '1em',
          }}
        >
          <div style={{ flexGrow: 1, background: 'black' }}>{`Internship Details`}</div>
          <div style={{ flexGrow: 1, background: 'tomato' }}>{`hello-2`}</div>
          <div style={{ flexGrow: 1, background: 'black' }}>{`hello-3`}</div>
          <div style={{ flexGrow: 1, background: 'tomato' }}>{`hello-4`}</div>
          <div style={{ flexGrow: 1, background: 'toblackmato' }}>{`hello-1`}</div>
        </div>
      </div>

      <div style={{ background: 'yellow', display: 'flex', flexGrow: '1', padding: '1em' }}>
        <div style={{ background: 'red', padding: '1em 2em 0 2em' }}>{`three`}</div>
        <div
          style={{
            background: 'blue',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: '1',
            paddingTop: '1em',
          }}
        >
          <div style={{ flexGrow: 1, background: 'black' }}>{`Education Details`}</div>
          <div style={{ flexGrow: 1, background: 'tomato' }}>{`hello-2`}</div>
          <div style={{ flexGrow: 1, background: 'black' }}>{`hello-3`}</div>
          <div style={{ flexGrow: 1, background: 'tomato' }}>{`hello-4`}</div>
          <div style={{ flexGrow: 1, background: 'black' }}>{`hello-1`}</div>
        </div>
      </div>
    </div>
  )
}

export default Cv
