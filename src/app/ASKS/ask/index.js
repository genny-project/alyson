import { includes } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import createSendAnswer from 'app/ASKS/utils/create-send-answer'
import { FormControl, FormLabel } from '@chakra-ui/react'
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

const Ask = ({ parentCode, questionCode }) => {
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
    <Button askData={askData} />
  ) : (
    <FormControl isRequired={mandatory}>
      {!multiple && <FormLabel fontWeight="semibold">{name}</FormLabel>}
      {component === 'email' && <Email.Write onSendAnswer={onSendAnswer} askData={askData} />}
      {component === 'phone' && <Phone.Write onSendAnswer={onSendAnswer} data={data} />}
      {component === 'address' && <Address.Write onSendAnswer={onSendAnswer} />}
      {(component === 'dropdown' || component === 'tag') && (
        <Select.Write
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
          groupCode={groupCode}
          attributeCode={attributeCode}
          onSendAnswer={onSendAnswer}
          data={data}
          mandatory={mandatory}
        />
      )}
      {component === 'text' && (
        <Text.Write mandatory={mandatory} data={data} onSendAnswer={onSendAnswer} />
      )}
      {component === 'social' && (
        <Social.Write mandatory={mandatory} data={data} onSendAnswer={onSendAnswer} />
      )}
      {component === 'upload' && (
        <Upload.Write dttData={dataType} data={data} onSendAnswer={onSendAnswer} />
      )}
      {component === 'date' && <Date.Write data={data} onSendAnswer={onSendAnswer} />}
      {component === 'richtext_editor' && (
        <RichText.Write data={data} onSendAnswer={onSendAnswer} description={description} />
      )}
      {component === 'date_range' && (
        <DateRange.Write data={data} onSendAnswer={onSendAnswer} html={html} />
      )}
      {component === 'video' && <Video.Write data={data} onSendAnswer={onSendAnswer} html={html} />}
      {component === 'time_range' && <TimeRange.Write data={data} onSendAnswer={onSendAnswer} />}
      {component === 'html_display' && <HtmlDisplay.Read data={data} />}
      {component === 'signature' && <Signature.Write data={data} onSendAnswer={onSendAnswer} />}
      {/* <div>{component}</div> */}
    </FormControl>
  )
}

export default Ask
