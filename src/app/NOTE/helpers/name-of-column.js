const cols = {
  0: 'Application',
  1: 'Intern',
  2: 'Internship',
  3: 'Host Company',
  4: 'Supervisor',
}

const nameOfColumn = idx => cols[idx] || ''

export default nameOfColumn
