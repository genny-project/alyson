import { Text, VStack } from '@chakra-ui/layout'

const QUE_INTERNSHIP_VIDEO = {
  detail: (
    <VStack align="start">
      <Text textStyle="body.1">
        To attract the best talent to your internship opportunity, please record a short video
        covering:
      </Text>
      <Text>1. Summary of your business</Text>
      <Text>2. Why your company is a great place to work</Text>
      <Text>3. What is the intern going to do</Text>
      <Text>4. What will the intern learn</Text>
      <Text textStyle="body.3">
        Our data confirms that interns are more attracted to the internship opportunities that have
        a short video. To see an example on how easy it is, click on the "View Example" button
        below.
      </Text>
    </VStack>
  ),
  explanation_video_title: 'View Example',
  explanation_video: 'https://youtu.be/pVbyLRC5_rA',
}

const configs = {
  QUE_INTERNSHIP_VIDEO,
}
export default configs
