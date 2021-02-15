let map

const initialiseMap = inputRef => {
  map = new window.google.maps.Map(inputRef.current)
}

export default initialiseMap
