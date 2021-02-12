let map

const initialiseMap = (inputRef, searchAddress, allOptions, setAllOptions) => {
  map = new window.google.maps.Map(inputRef.current)
}

export default initialiseMap
