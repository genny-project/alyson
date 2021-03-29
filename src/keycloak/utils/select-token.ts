import { Keyable } from 'utils/types'

const selectToken = ({
  guestKeycloak,
  tokenFromKeycloak,
  tokenFromUrl,
}: {
  guestKeycloak: Keyable | undefined
  tokenFromKeycloak: string | undefined
  tokenFromUrl: string | undefined
}) => tokenFromKeycloak || tokenFromUrl || guestKeycloak?.data?.access_token

export default selectToken
