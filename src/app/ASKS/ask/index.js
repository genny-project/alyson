import {
  Text as CText,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
} from '@chakra-ui/react'
import { equals, pathOr } from 'ramda'

import ABN from 'app/DTT/abn'
import Address from 'app/DTT/address'
import Attribute from 'app/BE/attribute'
import Button from 'app/DTT/event_button'
import CheckBox from 'app/DTT/check_box'
import Date from 'app/DTT/date'
import DateRange from 'app/DTT/date_range'
import Email from 'app/DTT/email'
import Flag from 'app/DTT/flag'
import HtmlDisplay from 'app/DTT/html_display'
import LogRocketSession from 'app/DTT/log_rocket_session'
import Phone from 'app/DTT/phone'
import Radio from 'app/DTT/radio'
import Rating from 'app/DTT/rating'
import RichText from 'app/DTT/rich_text'
import Select from 'app/DTT/select'
import Signature from 'app/DTT/signature'
import Social from 'app/DTT/social'
import Text from 'app/DTT/text'
import TextArea from 'app/DTT/text_area'
import ThirdPartyVideo from 'app/DTT/third_party_video'
import TimeRange from 'app/DTT/time_range'
import TimeZonePicker from 'app/DTT/time_zone'
import URL from 'app/DTT/url'
import Upload from 'app/DTT/upload'
import Video from 'app/DTT/video'
import ProgressBar from 'app/DTT/progress'
import { apiConfig } from 'config/get-api-config.js'
import createSendAnswer from 'app/ASKS/utils/create-send-answer'
import getGroupCode from 'app/ASKS/utils/get-group-code'
import { selectCode } from 'redux/db/selectors'
import { selectHighlightedQuestion } from 'redux/app/selectors'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { useMobileValue } from 'utils/hooks'
import { useSelector } from 'react-redux'

const Ask = ({
  parentCode,
  questionCode: passedQuestionCode,
  onFinish,
  passedAskData,
  passedTargetCode,
  config,
  noLabel,
  secondaryColor,
  properties,
}) => {
  const projectTitle = useGetAttributeFromProjectBaseEntity('PRI_NAME')?.valueString.toLowerCase()

  const askData = useSelector(selectCode(parentCode, passedQuestionCode)) || passedAskData

  const {
    questionCode,
    attributeCode,
    targetCode,
    name,
    question,
    mandatory,
    hidden,
    disabled,
    readonly,
    placeholder,
    processId,
    sourceCode,
  } = askData || {}

  const clientId = apiConfig?.clientId
  const data = useSelector(selectCode(passedTargetCode || targetCode, attributeCode)) || {}

  const highlightedQuestion = useSelector(selectHighlightedQuestion)
  const labelWidth = useMobileValue(['full', '25vw'])
  const groupCode = getGroupCode(question) || parentCode
  const placeholderName = equals(clientId)('lojing') ? name : ''
  if (!question?.attribute) return null

  const {
    attribute: {
      description,
      dataType: { component = 'text', typeName },
      dataType,
    },
    html,
    helper,
  } = question

  const regexPattern = pathOr(null, ['validationList', 0, 'regex'])(dataType)
  const errorMessage = pathOr('Please enter valid data', ['validationList', 0, 'errormsg'])(
    dataType,
  )

  if (!question?.attribute) return null

  const feedback = data?.feedback
  const onSendAnswer = createSendAnswer(askData, { passedTargetCode })

  if (readonly) {
    return (
      <HStack>
        <CText id={attributeCode} w={labelWidth} textStyle="body.1">
          {name}
        </CText>
        <Attribute config={{ textStyle: 'body.1' }} code={targetCode} attribute={attributeCode} />
      </HStack>
    )
  }

  if (!!disabled && component !== 'button')
    return (
      <FormControl isDisabled isRequired={mandatory}>
        <HStack display={noLabel ? 'none' : 'block'} justify="space-between">
          <FormLabel id={attributeCode} textStyle="body.1">
            {name}
          </FormLabel>
          <FormHelperText>{helper}</FormHelperText>
        </HStack>
      </FormControl>
    )
  if (component === 'checkbox')
    return (
      <CheckBox.Write
        data={data}
        questionCode={questionCode}
        onSendAnswer={onSendAnswer}
        label={name}
        isRequired={mandatory}
        id={attributeCode}
        regexPattern={regexPattern}
        errorMessage={errorMessage}
        parentCode={parentCode}
        attributeCode={attributeCode}
        targetCode={targetCode}
      />
    )
  return component === 'button' ? (
    <Button
      questionCode={questionCode}
      parentCode={parentCode}
      askData={askData}
      onFinish={onFinish}
      id={attributeCode}
      regexPattern={regexPattern}
      errorMessage={errorMessage}
      attributeCode={attributeCode}
      targetCode={targetCode}
      sourceCode={sourceCode}
    />
  ) : (
    <FormControl
      display={hidden || component === 'log_rocket_session' ? 'none' : 'block'}
      isDisabled={!!disabled}
      isRequired={mandatory}
      isInvalid={!!feedback}
      border={highlightedQuestion === attributeCode ? '1px solid red' : '1px solid transparent'}
      borderRadius="md"
      p={highlightedQuestion === attributeCode ? '3' : '0'}
      transition="all 0.5s"
      mb={5}
    >
      {
        <HStack
          justify="space-between"
          display={noLabel ? 'none' : 'flex'}
          maxW={labelWidth}
          w={'full'}
        >
          <FormLabel id={attributeCode} />
        </HStack>
      }

      {component === 'email' && (
        <Email.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          askData={askData}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          attributeCode={attributeCode}
          parentCode={parentCode}
          placeholderName={placeholderName}
          targetCode={targetCode}
        />
      )}
      {component === 'phone' && (
        <Phone.Write
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          data={data}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          attributeCode={attributeCode}
          parentCode={parentCode}
          placeholderName={placeholderName}
          targetCode={targetCode}
        />
      )}
      {component === 'address' && (
        <Address.Write
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          data={data}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {(component === 'dropdown' || component === 'tag') && (
        <Select.Write
          config={config}
          targetCode={targetCode}
          questionCode={questionCode}
          groupCode={groupCode}
          attributeCode={attributeCode}
          onSendAnswer={onSendAnswer}
          placeholder={description}
          mandatory={mandatory}
          component={component}
          dataType={dataType}
          data={data}
          label={name}
          parentCode={parentCode}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          processId={processId}
          placeholderName={placeholderName}
        />
      )}
      {component === 'radio' && (
        <Radio.Write
          questionCode={questionCode}
          groupCode={groupCode}
          attributeCode={attributeCode}
          onSendAnswer={onSendAnswer}
          data={data}
          mandatory={mandatory}
          parentCode={parentCode}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          placeholderName={placeholderName}
          targetCode={targetCode}
        />
      )}
      {component === 'text' && (
        <Text.Write
          questionCode={questionCode}
          mandatory={mandatory}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          attributeCode={attributeCode}
          targetCode={targetCode}
          parentCode={parentCode}
          placeholderName={placeholderName}
        />
      )}
      {component === 'textarea' && (
        <TextArea.Write
          questionCode={questionCode}
          mandatory={mandatory}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          secondaryColor={secondaryColor}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'social' && (
        <Social.Write
          questionCode={questionCode}
          mandatory={mandatory}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'upload' && (
        <Upload.Write
          questionCode={questionCode}
          dttData={dataType}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          placeholderName={placeholderName}
          parentCode={parentCode}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {(component === 'date' || component === 'year') && (
        <Date.Write
          questionCode={questionCode}
          typeName={typeName}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          question={question}
          parentCode={parentCode}
          realm={projectTitle}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'richtext_editor' && (
        <RichText.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          description={description}
          html={html}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          placeholder={placeholder}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'date_range' && (
        <DateRange.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          html={html}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'video' && (
        <Video.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          html={html}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'time_range' && (
        <TimeRange.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'html_display' && (
        <HtmlDisplay.Read
          questionCode={questionCode}
          data={data}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'signature' && (
        <Signature.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'link' && (
        <URL.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'abn_number' && (
        <ABN.Write
          disabled={disabled}
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'rating' && (
        <Rating.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'youtube' && (
        <ThirdPartyVideo.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'time_zone' && (
        <TimeZonePicker.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'checkbox' && (
        <CheckBox.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'log_rocket_session' && (
        <LogRocketSession.Write
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'flag' && (
        <Flag.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      {component === 'progress' && (
        <ProgressBar.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
          parentCode={parentCode}
          placeholderName={placeholderName}
          attributeCode={attributeCode}
          targetCode={targetCode}
        />
      )}
      <FormErrorMessage>{feedback}</FormErrorMessage>
    </FormControl>
  )
}

export default Ask
