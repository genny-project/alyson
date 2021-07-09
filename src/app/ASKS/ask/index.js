import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import createSendAnswer from 'app/ASKS/utils/create-send-answer'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Text as CText,
  useBoolean,
  FormHelperText,
} from '@chakra-ui/react'
import getGroupCode from 'app/ASKS/utils/get-group-code'
import Text from 'app/DTT/text'
import Button from 'app/DTT/button'
import Radio from 'app/DTT/radio'
import Select from 'app/DTT/select'
import Social from 'app/DTT/social'
import Email from 'app/DTT/email'
import Phone from 'app/DTT/phone'
import Address from 'app/DTT/address'
import Upload from 'app/DTT/upload'
import Date from 'app/DTT/date'
import RichText from 'app/DTT/rich_text'
import DateRange from 'app/DTT/date_range'
import Video from 'app/DTT/video'
import TimeRange from 'app/DTT/time_range'
import HtmlDisplay from 'app/DTT/html_display'
import Signature from 'app/DTT/signature'
import URL from 'app/DTT/url'
import ABN from 'app/DTT/abn'
import Rating from 'app/DTT/rating'
import ThirdPartyVideo from 'app/DTT/third_party_video'
import TimeZonePicker from 'app/DTT/time_zone'
import CheckBox from 'app/DTT/check_box'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons'
import LogRocketSession from 'app/DTT/log_rocket_session'
import Attribute from 'app/BE/attribute'
import { useMobileValue } from 'utils/hooks'
import { selectHighlightedQuestion } from 'redux/app/selectors'
import Flag from 'app/DTT/flag'
import { useEffect } from 'react'

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

  const data = useSelector(selectCode(targetCode, attributeCode)) || {}
  const highlightedQuestion = useSelector(selectHighlightedQuestion)
  const labelWidth = useMobileValue(['full', '25vw'])

  const groupCode = getGroupCode(question) || parentCode

  const [saving, setSaving] = useBoolean()

  useEffect(() => {
    setSaving.off()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.value])

  if (!question?.attribute) return null

  const {
    attribute: {
      description,
      dataType: { component = 'dropdown', typeName },
      dataType,
    },
    html,
    helper,
  } = question

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
      />
    )
  return component === 'button' ? (
    <Button
      questionCode={questionCode}
      parentCode={parentCode}
      askData={askData}
      onFinish={onFinish}
      id={attributeCode}
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
        />
      )}
      {component === 'phone' && (
        <Phone.Write questionCode={questionCode} onSendAnswer={onSendAnswer} data={data} />
      )}
      {component === 'address' && (
        <Address.Write questionCode={questionCode} onSendAnswer={onSendAnswer} data={data} />
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
        />
      )}
      {component === 'text' && (
        <Text.Write
          questionCode={questionCode}
          mandatory={mandatory}
          data={data}
          onSendAnswer={onSendAnswer}
        />
      )}
      {component === 'social' && (
        <Social.Write
          questionCode={questionCode}
          mandatory={mandatory}
          data={data}
          onSendAnswer={onSendAnswer}
        />
      )}
      {component === 'upload' && (
        <Upload.Write
          questionCode={questionCode}
          dttData={dataType}
          data={data}
          onSendAnswer={onSendAnswer}
        />
      )}
      {(component === 'date' || component === 'year') && (
        <Date.Write
          questionCode={questionCode}
          typeName={typeName}
          data={data}
          onSendAnswer={onSendAnswer}
        />
      )}
      {component === 'richtext_editor' && (
        <RichText.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          description={description}
          html={html}
        />
      )}
      {component === 'date_range' && (
        <DateRange.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          html={html}
        />
      )}
      {component === 'video' && (
        <Video.Write
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
          html={html}
        />
      )}
      {component === 'time_range' && (
        <TimeRange.Write questionCode={questionCode} data={data} onSendAnswer={onSendAnswer} />
      )}
      {component === 'html_display' && <HtmlDisplay.Read questionCode={questionCode} data={data} />}
      {component === 'signature' && (
        <Signature.Write questionCode={questionCode} data={data} onSendAnswer={onSendAnswer} />
      )}
      {component === 'link' && (
        <URL.Write questionCode={questionCode} data={data} onSendAnswer={onSendAnswer} />
      )}
      {component === 'abn_number' && (
        <ABN.Write
          disabled={disabled}
          questionCode={questionCode}
          data={data}
          onSendAnswer={onSendAnswer}
        />
      )}
      {component === 'rating' && (
        <Rating.Write data={data} questionCode={questionCode} onSendAnswer={onSendAnswer} />
      )}
      {component === 'youtube' && (
        <ThirdPartyVideo.Write
          data={data}
          questionCode={questionCode}
          onSendAnswer={onSendAnswer}
        />
      )}
      {component === 'time_zone' && (
        <TimeZonePicker.Write data={data} questionCode={questionCode} onSendAnswer={onSendAnswer} />
      )}
      {component === 'checkbox' && (
        <CheckBox.Write data={data} questionCode={questionCode} onSendAnswer={onSendAnswer} />
      )}
      {component === 'log_rocket_session' && <LogRocketSession.Write onSendAnswer={onSendAnswer} />}
      {component === 'flag' && (
        <Flag.Write data={data} questionCode={questionCode} onSendAnswer={onSendAnswer} />
      )}
      <FormErrorMessage>{feedback}</FormErrorMessage>
    </FormControl>
  )
}

export default Ask
