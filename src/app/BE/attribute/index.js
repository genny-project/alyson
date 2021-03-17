import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

import Text from 'app/DTT/text'
import Email from 'app/DTT/email'
import Upload from 'app/DTT/upload'
import Social from 'app/DTT/social'
import Status from 'app/DTT/status'
import Phone from 'app/DTT/phone'
import Date from 'app/DTT/date'
import ProgressBar from 'app/DTT/progress_bar'
import HtmlDisplay from 'app/DTT/html_display'
import RichText from 'app/DTT/rich_text'
import Select from 'app/DTT/select'
import Video from 'app/DTT/video'
import Address from 'app/DTT/address'
import ABN from 'app/DTT/abn'
import URL from 'app/DTT/url'
import Rating from 'app/DTT/rating'
import TimeZonePicker from 'app/DTT/time_zone'

const Attribute = ({ code, attribute, size, mini, parentCode, variant, config }) => {
  const data = useSelector(selectCode(code, attribute))
  const dtt = useSelector(selectCode(data?.attributeCode))
  const dttData = useSelector(selectCode(dtt))
  const component = dttData?.component

  if (!component) return <div />

  return component === 'email' ? (
    <Email.Read data={data} size={size} />
  ) : component === 'phone' ? (
    <Phone.Read data={data} size={size} />
  ) : component === 'text' ? (
    <Text.Read data={data} config={config} />
  ) : component === 'upload' ? (
    <Upload.Read
      parentCode={parentCode}
      data={data}
      dttData={dttData}
      size={size}
      variant={variant}
    />
  ) : component === 'social' ? (
    <Social.Read data={data} dttData={dttData} size={size} />
  ) : component === 'status' ? (
    <Status.Read data={data} size={size} />
  ) : component === 'date' ? (
    <Date.Read data={data} size={size} typeName={dttData.typeName} />
  ) : component === 'progress' ? (
    <ProgressBar.Read data={data} />
  ) : component === 'html_display' ? (
    <HtmlDisplay.Read data={data} />
  ) : component === 'richtext_editor' ? (
    <RichText.Read data={data} mini={mini} />
  ) : component === 'dropdown' ? (
    <Select.Read dataType={dttData} data={data} />
  ) : component === 'video' ? (
    <Video.Read mini={mini} dataType={dttData} data={data} />
  ) : component === 'address' ? (
    <Address.Read data={data} config={config} />
  ) : component === 'abn_number' ? (
    <ABN.Read data={data} />
  ) : component === 'link' ? (
    <URL.Read data={data} />
  ) : component === 'rating' ? (
    <Rating.Read data={data} />
  ) : component === 'time_zone' ? (
    <TimeZonePicker.Read data={data} />
  ) : (
    <div>
      {component}
      {data?.value}
    </div>
  )
}

export default Attribute
