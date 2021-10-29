import {
  Text as CText,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  useBoolean,
} from '@chakra-ui/react'
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons'

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
import ThirdPartyVideo from 'app/DTT/third_party_video'
import TimeRange from 'app/DTT/time_range'
import TimeZonePicker from 'app/DTT/time_zone'
import URL from 'app/DTT/url'
import Upload from 'app/DTT/upload'
import Video from 'app/DTT/video'
import createSendAnswer from 'app/ASKS/utils/create-send-answer'
import getGroupCode from 'app/ASKS/utils/get-group-code'
import { pathOr } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { selectHighlightedQuestion } from 'redux/app/selectors'
import { useEffect } from 'react'
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
}) => {
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
  } = askData || {}

  const regexPattern = pathOr(null, ['attribute', 'dataType', 'validationList', 0, 'regex'])(
    question,
  )

  const data = useSelector(selectCode(targetCode, attributeCode)) || {}
  const highlightedQuestion = useSelector(selectHighlightedQuestion)
  const labelWidth = useMobileValue(['full', '25vw'])

  const dataTypeFromReduxStore = useSelector(selectCode(attributeCode)) || ''
  const dataType = useSelector(selectCode(dataTypeFromReduxStore)) || ''
  const description = useSelector(selectCode(`${attributeCode}@description`)) || ''
  const groupCode = getGroupCode(question) || parentCode

  const [saving, setSaving] = useBoolean()

  useEffect(() => {
    setSaving.off()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.value])

  if (!question?.attribute) return null

  const { html, helper } = question

  const { component = 'text', typeName } = dataType

  const feedback = data?.feedback
  const onSendAnswer = createSendAnswer(askData, { passedTargetCode, setSaving })

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
        <HStack display={noLabel ? 'none' : 'block'} w={labelWidth} justify="space-between">
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
        {saving ? (
          <FontAwesomeIcon icon={faCircle} color="gold" />
        ) : data?.value ? (
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
        />
      )}
      {component === 'phone' && (
        <Phone.Write
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          data={data}
          regexPattern={regexPattern}
        />
      )}
      {component === 'address' && (
        <Address.Write
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          data={data}
          regexPattern={regexPattern}
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
        />
      )}
      {component === 'text' && (
        <Text.Write
          questionCode={questionCode}
          mandatory={mandatory}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
        />
      )}
      {component === 'social' && (
        <Social.Write
          questionCode={questionCode}
          mandatory={mandatory}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
        />
      )}
      {component === 'upload' && (
        <Upload.Write
          questionCode={questionCode}
          dttData={dataType}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
        />
      )}
      {(component === 'date' || component === 'year') && (
        <Date.Write
          questionCode={questionCode}
          typeName={typeName}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
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
        />
      )}
      {component === 'date_range' && (
        <DateRange.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          html={html}
          regexPattern={regexPattern}
        />
      )}
      {component === 'video' && (
        <Video.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          html={html}
          regexPattern={regexPattern}
        />
      )}
      {component === 'time_range' && (
        <TimeRange.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
        />
      )}
      {component === 'html_display' && (
        <HtmlDisplay.Read questionCode={questionCode} data={data} regexPattern={regexPattern} />
      )}
      {component === 'signature' && (
        <Signature.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
        />
      )}
      {component === 'link' && (
        <URL.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
        />
      )}
      {component === 'abn_number' && (
        <ABN.Write
          disabled={disabled}
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
        />
      )}
      {component === 'rating' && (
        <Rating.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
        />
      )}
      {component === 'youtube' && (
        <ThirdPartyVideo.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
        />
      )}
      {component === 'time_zone' && (
        <TimeZonePicker.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
        />
      )}
      {component === 'checkbox' && (
        <CheckBox.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
        />
      )}
      {component === 'log_rocket_session' && (
        <LogRocketSession.Write onSendAnswer={onSendAnswer} regexPattern={regexPattern} />
      )}
      {component === 'flag' && (
        <Flag.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
          regexPattern={regexPattern}
        />
      )}
      <FormErrorMessage>{feedback}</FormErrorMessage>
    </FormControl>
  )
}

export default Ask
