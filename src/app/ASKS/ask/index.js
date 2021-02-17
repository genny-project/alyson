import { includes } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import createSendAnswer from 'app/ASKS/utils/create-send-answer'
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/react'
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

const Ask = ({ parentCode, questionCode, onFinish }) => {
  const askData = useSelector(selectCode(parentCode, questionCode))

  const { attributeCode, targetCode, name, question, mandatory } = askData

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

  const multiple = includes('multiple', typeName || '') || component === 'tag'

  const onSendAnswer = createSendAnswer(askData)

  return component === 'button' ? (
    <Button
      questionCode={questionCode}
      parentCode={parentCode}
      askData={askData}
      onFinish={onFinish}
    />
  ) : (
    <FormControl isRequired={mandatory}>
      {!multiple && <FormLabel fontWeight="semibold">{name}</FormLabel>}
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
        <ABN.Write questionCode={questionCode} data={data} onSendAnswer={onSendAnswer} />
      )}
      {component === 'rating' && (
        <Rating.Write data={data} questionCode={questionCode} onSendAnswer={onSendAnswer} />
      )}
      <FormHelperText>{data?.value && `Saved ${data.value}`}</FormHelperText>
    </FormControl>
  )
}

export default Ask
