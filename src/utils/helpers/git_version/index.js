import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_VERSION_URL } from 'config/genny'
import { VStack, Text, Center, HStack } from '@chakra-ui/react'
import { map, mergeAll, head, compose, keys, addIndex, values, uniq } from 'ramda'

import GitInfo from 'react-git-info/macro'

const GitVersionInfo = () => {
  const [uniqApiValue, setUniqueApiValue] = useState('')
  const gitInfo = GitInfo()

  useEffect(() => {
    const getApiVersion = async () => {
      try {
        const apiResponse = await axios.get(API_VERSION_URL)
        const apiVersions = compose(
          mergeAll,
          addIndex(map)((key, idx) => ({
            [key]: apiResponse?.data?.version[idx][key]['git.branch'],
          })),
          map(head),
          map(keys),
        )(apiResponse?.data?.version || [])
        const apiUniq = compose(uniq, values)(apiVersions)
        setUniqueApiValue(apiUniq[0])
      } catch (error) {
        console.error('There was an error trying to fetch the api information', error)
      }
    }
    getApiVersion()
  }, [])

  return (
    <Center h="40vh">
      <VStack align="left" spacing={5}>
        <HStack spacing={5}>
          <Text textStyle="head.2">{`Branch :`}</Text>
          <Text textStyle="head.1">{gitInfo.branch}</Text>
        </HStack>
        <HStack spacing={5}>
          <Text textStyle="head.2">{`Hash :`}</Text>
          <Text textStyle="head.1">{gitInfo.commit.hash}</Text>
        </HStack>
        <HStack spacing={5}>
          <Text textStyle="head.2">{`API :`}</Text>
          <Text textStyle="head.1">{uniqApiValue}</Text>
        </HStack>
      </VStack>
    </Center>
  )
}

export default GitVersionInfo
