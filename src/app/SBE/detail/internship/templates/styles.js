const styles = {
  container: {
    display: 'flex',
    justifyContent: '',
    flexDirection: 'column',
    minHeight: '80vh',
    width: '70vw',
    margin: 'auto',
    border: '1px solid #e5e5e5',
    borderRadius: '10px',
  },

  headerContainer: {
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1em',
  },

  headerSectionInfoContainer: {
    display: 'flex',
    width: '40%',
  },

  headerSectionActionContainer: {},

  headerSectionProfile: {
    display: 'flex',
    flexGrow: '1',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '40%',
    maxHeight: '100%',
  },

  headerSectionName: {
    display: 'flex',
    flexGrow: '2',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '60%',
  },

  detailSectionContainer: {
    display: 'flex',
    flexGrow: '1',
    padding: '1em',
  },

  detailSectionIconContainer: {
    padding: '1em 2em 0 2em',
  },

  detailSectionInformationContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    paddingTop: '1em',
  },
}

export default styles
