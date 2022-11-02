import { Image, Text as CText } from '@chakra-ui/react'
import ABN from 'app/DTT/abn'
import Address from 'app/DTT/address'
import CheckBox from 'app/DTT/check_box'
import Date from 'app/DTT/date'
import Email from 'app/DTT/email'
import Flag from 'app/DTT/flag'
import HtmlDisplay from 'app/DTT/html_display'
import ImageType from 'app/DTT/upload/Image'
import Phone from 'app/DTT/phone'
import JournalProgress from 'app/DTT/progress'
import Rating from 'app/DTT/rating'
import RichText from 'app/DTT/rich_text'
import Select from 'app/DTT/select'
import Social from 'app/DTT/social'
import Status from 'app/DTT/status'
import Text from 'app/DTT/text'
import TextArea from 'app/DTT/text_area'
import TimeZonePicker from 'app/DTT/time_zone'
import URL from 'app/DTT/url'
import Upload from 'app/DTT/upload'
import Video from 'app/DTT/video'
import fixLnkAndPri from './fix-lnk-and-pri'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import HtmlEditor from 'app/DTT/html-editor'
import Favourites from 'app/DTT/favourites'
import ProgressBar from 'app/DTT/progress'

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
  hasIndicatorIcon,
}) => {
  const data = useSelector(selectCode(code, attribute))
  const dtt = useSelector(selectCode(fixLnkAndPri(data?.attributeCode)))
  const dttData = useSelector(selectCode(dtt))
  const component = dttData?.component

  if (attribute === 'PRI_IMAGE_URL' && !!data) {
    return <ImageType.Read config={config} code={code} data={data} parentCode={parentCode} />
  }

  /// Currently how I handle displaying the app logo in the header.
  /// I reckon this can be improved but was unsure how to.
  /// - Dan
  if (attribute === 'PRI_LOGO' && data && data.valueString) {
    return <Image src={data.valueString} {...config} />
  }

  if (!component && fallback) return fallback

  if (data && data.attributeName === 'ImageUrl')
    return <ImageType.Read config={config} code={code} data={data} parentCode={parentCode} />

  return component === 'email' ? (
    <Email.Read data={data} size={size} />
  ) : component === 'phone' ? (
    <Phone.Read data={data} size={size} />
  ) : component === 'text' ? (
    <Text.Read size={size} data={data} config={config} hasIndicatorIcon={hasIndicatorIcon} />
  ) : component === 'textarea' ? (
    <TextArea.Read size={size} data={data} config={config} />
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
    <Social.Read data={data} dttData={dttData} size={size} config={config} />
  ) : component === 'status' ? (
    <Status.Read data={data} size={size} />
  ) : component === 'date' ? (
    <Date.Read config={config} data={data} size={size} typeName={dttData.typeName} />
  ) : component === 'progress' ? (
    <JournalProgress.Read data={data} />
  ) : component === 'html_display' ? (
    <HtmlDisplay.Read data={data} />
  ) : component === 'richtext_editor' ? (
    <RichText.Read data={data} mini={mini} styles={styles} config={config} />
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
  ) : component === 'html_editor' ? (
    <HtmlEditor.Read data={data} />
  ) : component === 'favourites' ? (
    <Favourites.Read data={data} />
  ) : component === 'progress' ? (
    <ProgressBar data={data} />
  ) : (
    <CText>{data?.value}</CText>
  )
}

export default Attribute
