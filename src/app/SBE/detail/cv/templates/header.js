import styles from './styles'

const Header = () => {
  return (
    <div style={styles.headerContainer}>
      <div style={styles.headerSectionInfoContainer}>
        <div style={styles.headerSectionProfile}>{`Barad`}</div>
        <div style={styles.headerSectionName}>{`Barad Ghimire`}</div>
      </div>
      <div style={styles.headerSectionActionContainer}>{`three`}</div>
    </div>
  )
}

export default Header
