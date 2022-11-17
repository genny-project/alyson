import Video from 'app/DTT/video'
export default {
  title: 'Components/Video',
  component: Video,
}

const VideoPlayer = args => {
  return <Video.Read data={''} mini={''} styles={{}} config={{}} />
}
export const Player = VideoPlayer.bind({})
