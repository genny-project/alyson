import {
  Text as CText,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
} from '@chakra-ui/react'

import ABN from 'app/DTT/abn'
import Address from 'app/DTT/address'
import Attribute from 'app/BE/attribute'
import Button from 'app/DTT/button'
import CheckBox from 'app/DTT/check_box'
import Date from 'app/DTT/date'
import DateRange from 'app/DTT/date_range'
import Email from 'app/DTT/email'
import Flag from 'app/DTT/flag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
import createSendAnswer from 'app/ASKS/utils/create-send-answer'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import getGroupCode from 'app/ASKS/utils/get-group-code'
import { pathOr } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { selectHighlightedQuestion } from 'redux/app/selectors'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useMobileValue } from 'utils/hooks'
import { useSelector } from 'react-redux'
import { isNotStringifiedEmptyArray } from 'utils/functionals'

const Ask = ({
  parentCode,
  questionCode: passedQuestionCode,
  onFinish,
  passedAskData,
  passedTargetCode,
  config,
  noLabel,
  forcedComponent,
}) => {
  const { errorState } = useError()
  const { fieldState } = useIsFieldNotEmpty()

  const failedValidation = errorState[passedQuestionCode]
  const fieldNotEmpty = fieldState[passedQuestionCode]

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
  } = askData || {}

  const data = useSelector(selectCode(targetCode, attributeCode)) || {}

  const highlightedQuestion = useSelector(selectHighlightedQuestion)
  const labelWidth = useMobileValue(['full', '25vw'])

  const dataTypeFromReduxStore = useSelector(selectCode(attributeCode)) || ''
  const dataType = useSelector(selectCode(dataTypeFromReduxStore)) || ''
  const description = useSelector(selectCode(`${attributeCode}@description`)) || ''
  const groupCode = getGroupCode(question) || parentCode
  const regexPattern = pathOr(null, ['validationList', 0, 'regex'])(dataType)
  const errorMessage = pathOr('Please enter valid data', ['validationList', 0, 'errormsg'])(
    dataType,
  )
  const dataValue = data?.value

  if (!question?.attribute) return null

  const { html, helper } = question
  const { component = forcedComponent || 'text', typeName } = dataType

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
        <HStack display={noLabel ? 'none' : 'block'} w={'17.5vw'} justify="space-between">
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
    />
  ) : (
    <FormControl
      display={hidden || component === 'log_rocket_session' ? 'none' : 'block'}
      isDisabled={!!disabled}
      isRequired={mandatory}
      isInvalid={!!feedback}
      border={highlightedQuestion === attributeCode ? '1px solid red' : ''}
      borderRadius="md"
      p={highlightedQuestion === attributeCode ? '3' : ''}
      transition="all 0.5s"
      minH="82px"
    >
      <HStack justify="space-between" display={noLabel ? 'none' : 'flex'} w={labelWidth}>
        <FormLabel id={attributeCode}>{name}</FormLabel>
        {(!failedValidation && fieldNotEmpty) ||
        (dataValue && isNotStringifiedEmptyArray(dataValue)) ? (
          <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
        ) : null}
      </HStack>
      <FormHelperText mt="-1" mb="2" display={helper ? 'block' : 'none'} textStyle="body.3">
        {helper}
      </FormHelperText>
      {component === 'email' && (
        <Email.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          askData={askData}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
        />
      )}
      {component === 'phone' && (
        <Phone.Write
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          data={data}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
        />
      )}
      {component === 'address' && (
        <Address.Write
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          data={data}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
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
          name={name}
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
        />
      )}
      {component === 'time_range' && (
        <TimeRange.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
        />
      )}
      {component === 'html_display' && (
        <HtmlDisplay.Read
          questionCode={questionCode}
          data={data}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
        />
      )}
      {component === 'signature' && (
        <Signature.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
        />
      )}
      {component === 'link' && (
        <URL.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
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
        />
      )}
      {component === 'rating' && (
        <Rating.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
        />
      )}
      {component === 'youtube' && (
        <ThirdPartyVideo.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
        />
      )}
      {component === 'time_zone' && (
        <TimeZonePicker.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
        />
      )}
      {component === 'checkbox' && (
        <CheckBox.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
        />
      )}
      {component === 'log_rocket_session' && (
        <LogRocketSession.Write
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
        />
      )}
      {component === 'flag' && (
        <Flag.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
          errorMessage={errorMessage}
        />
      )}
      <FormErrorMessage>{feedback}</FormErrorMessage>
    </FormControl>
  )
}

export default Ask
