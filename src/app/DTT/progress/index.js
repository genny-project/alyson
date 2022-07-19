import ProgressBar from './Progress_Bar'
import { Write } from 'app/DTT/text'

const Read = ({ data }) => <ProgressBar value={data?.value} />

const Progress = {
  Read,
  Write,
}

export default Progress
