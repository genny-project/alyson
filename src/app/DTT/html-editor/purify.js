import DOMPurify from 'dompurify'

const purify = html =>
  DOMPurify.sanitize(html, {
    FORCE_BODY: true,
    ALLOWED_ATTR: ['style', 'class', 'type', 'href', 'rel'],
  })

export default purify
