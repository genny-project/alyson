const styles = {
  container: {
    display: 'flex',
    justifyContent: '',
    flexDirection: 'column',
    background: 'red',
    width: '70vw',
    height: '80vh',
    margin: 'auto',
  },

  headerContainer: {
    background: 'green',
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1em',
    paddingBottom: 0,
  },

  headerSectionInfoContainer: {
    display: 'flex',
    width: '40%',
    background: 'royalblue',
  },

  headerSectionActionContainer: {
    background: 'black',
  },

  headerSectionProfile: {
    display: 'flex',
    flexGrow: '1',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'black',
    maxWidth: '40%',
  },

  headerSectionName: {
    display: 'flex',
    flexGrow: '2',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'tomato',
    maxWidth: '60%',
  },

  detailSectionContainer: {
    background: 'gold',
    display: 'flex',
    flexGrow: '1',
    padding: '1em',
    paddingBottom: 0,
  },

  detailSectionIconContainer: {
    background: 'red',
    padding: '1em 2em 0 2em',
  },

  detailSectionInformationContainer: {
    background: 'blue',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    paddingTop: '1em',
  },
}

export default styles
