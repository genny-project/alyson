import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import createSendAnswer from 'app/ASKS/utils/create-send-answer'
import { FormControl, FormLabel, FormErrorMessage, HStack, Box } from '@chakra-ui/react'
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
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import LogRocketSession from 'app/DTT/log_rocket_session'

const Ask = ({ parentCode, questionCode, onFinish, passedAskData, passedTargetCode }) => {
  const askData = useSelector(selectCode(parentCode, questionCode)) || passedAskData

  const { attributeCode, targetCode, name, question, mandatory, hidden, disabled } = askData

  const data = useSelector(selectCode(targetCode, attributeCode)) || {}

  const groupCode = getGroupCode(question)

  const {
    attribute: {
      description,
      dataType: { component, typeName },
      dataType,
    },
    html,
  } = question

  const feedback = data?.feedback
  const onSendAnswer = createSendAnswer(askData, { passedTargetCode })

  if (component === 'checkbox')
    return (
      <CheckBox.Write
        data={data}
        questionCode={questionCode}
        onSendAnswer={onSendAnswer}
        label={name}
        isRequired={mandatory}
      />
    )
  return component === 'button' ? (
    <Button
      questionCode={questionCode}
      parentCode={parentCode}
      askData={askData}
      onFinish={onFinish}
    />
  ) : (
    <FormControl
      visibility={hidden || component === 'log_rocket_session' ? 'hidden' : 'visible'}
      isDisabled={!!disabled}
      isRequired={mandatory}
      isInvalid={!!feedback}
    >
      <HStack>
        <FormLabel minW="94%" fontWeight="semibold">
          {name}
        </FormLabel>
        <Box>
          {data?.value ? (
            <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
          ) : null}
        </Box>
      </HStack>

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
      <FormErrorMessage>{feedback}</FormErrorMessage>
    </FormControl>
  )
}

export default Ask
