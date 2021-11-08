const removeHtmlTags = input => {
  var tmp = document.createElement('DIV')
  tmp.innerHTML = input
  return tmp.textContent || tmp.innerText || ''
}

export default removeHtmlTags
