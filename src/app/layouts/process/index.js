import { pathOr, equals } from 'ramda'
import { useSelector } from 'react-redux'
import { Box, HStack, VStack } from '@chakra-ui/react'
import { useKeycloak } from '@react-keycloak/web'

import Ask from 'app/ASKS/ask'
import Lane from 'app/SBE/lane'
import Search from 'app/SBE/search/Search'
import getUserType from 'utils/helpers/get-user'
import { selectCode } from 'redux/db/selectors'
import { selectProcess } from 'redux/app/selectors'
import FilterDjpInterns from 'app/layouts/process/filter-djp-interns'

const Process = ({ dashboard }) => {
  const userType = getUserType()
  const processCodes = useSelector(selectProcess, (prev, next) => prev.length === next.length)

  const bucketSearch = useSelector(selectCode('QUE_BUCKET_INTERNS_GRP')) || []
  const roles = pathOr('', ['realmAccess', 'roles'])(useKeycloak().keycloak)

  if (!processCodes) return null

  return (
    <VStack align="start" px="5">
      {!dashboard && userType !== 'INTERN' && (
        <HStack align="start">
          {bucketSearch &&
            bucketSearch.map((childAsk, index) => (
              <Box key={`${index}-${childAsk}`} width={'20rem'}>
                <Ask
                  noLabel
                  questionCode={childAsk}
                  parentCode={'QUE_BUCKET_INTERNS_GRP'}
                  forcedComponent="dropdown"
                />
              </Box>
            ))}
          {roles.includes('test') && (
            <Search process={processCodes[0]} sbeCode={JSON.stringify(processCodes)} />
          )}
          {equals(userType)('AGENT') && <FilterDjpInterns processCodes={processCodes} />}
        </HStack>
      )}

      <HStack spacing={5} marginBlockStart={5} w="100vw" align="flex-start" justify="space-between">
        {processCodes.map((sbeCode, index) => (
          <Lane key={`${index}-${sbeCode}`} sbeCode={sbeCode} dashboard={dashboard} />
        ))}
      </HStack>
    </VStack>
  )
}

export default Process
