import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Text as CText } from '@chakra-ui/react'
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
import CheckBox from 'app/DTT/check_box'
import ImageType from 'app/DTT/upload/Image'
import Flag from 'app/DTT/flag'
import fixLnk from './fix-lnk'

const Attribute = ({
  code,
  attribute,
  size,
  mini,
  parentCode,
  variant,
  config,
  fallback = null,
  styles,
}) => {
  const data = useSelector(selectCode(code, attribute))
  const dtt = useSelector(selectCode(fixLnk(data?.attributeCode)))
  const dttData = useSelector(selectCode(dtt))
  const component = dttData?.component

  if (attribute === 'PRI_IMAGE_URL' && !data)
    return <ImageType.Read config={config} code={code} data={data} parentCode={parentCode} />

  if (!component && fallback) return fallback

  if (data && data.attributeName === 'ImageUrl')
    return <ImageType.Read config={config} code={code} data={data} parentCode={parentCode} />

  return component === 'email' ? (
    <Email.Read data={data} size={size} />
  ) : component === 'phone' ? (
    <Phone.Read data={data} size={size} />
  ) : component === 'text' ? (
    <Text.Read size={size} data={data} config={config} />
  ) : component === 'upload' ? (
    <Upload.Read
      code={code}
      parentCode={parentCode}
      data={data}
      dttData={dttData}
      size={size}
      variant={variant}
      config={config}
    />
  ) : component === 'social' ? (
    <Social.Read data={data} dttData={dttData} size={size} />
  ) : component === 'status' ? (
    <Status.Read data={data} size={size} />
  ) : component === 'date' ? (
    <Date.Read config={config} data={data} size={size} typeName={dttData.typeName} />
  ) : component === 'progress' ? (
    <ProgressBar.Read data={data} />
  ) : component === 'html_display' ? (
    <HtmlDisplay.Read data={data} />
  ) : component === 'richtext_editor' ? (
    <RichText.Read data={data} mini={mini} styles={styles} />
  ) : component === 'dropdown' ? (
    <Select.Read dataType={dttData} data={data} />
  ) : component === 'video' ? (
    <Video.Read mini={mini} dataType={dttData} data={data} styles={styles} config={config} />
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
  ) : component === 'checkbox' ? (
    <CheckBox.Read data={data} />
  ) : component === 'flag' ? (
    <Flag.Read data={data} />
  ) : (
    <CText>{data?.value}</CText>
  )
}

export default Attribute
