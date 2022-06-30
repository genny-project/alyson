import { API_VERSION_URL, HOST } from 'config/genny'
import { addIndex, compose, head, includes, keys, map, mergeAll, uniq, values } from 'ramda'

import GitInfo from 'react-git-info/macro'
import axios from 'axios'
import showLogs from './helpers/show-logs'

const gitInfo = GitInfo()

const initLog = async () => {
  const apiResponse = await axios.get(API_VERSION_URL)
  const apiVersions = compose(
    mergeAll,
    addIndex(map)((key, idx) => ({ [key]: apiResponse?.data?.version[idx][key]['git.branch'] })),
    map(head),
    map(keys),
  )(apiResponse?.data?.version || [])

  const apiUniq = compose(uniq, values)(apiVersions)

  console.log(
    `%c
    ██████╗  █████╗ ██████╗  █████╗                                                      
    ██╔════╝ ██╔══██╗██╔══██╗██╔══██╗                                                     
    ██║  ███╗███████║██║  ██║███████║                                                     
    ██║   ██║██╔══██║██║  ██║██╔══██║                                                     
    ╚██████╔╝██║  ██║██████╔╝██║  ██║                                                     
     ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝ 

       ████████╗███████╗ ██████╗██╗  ██╗
       ╚══██╔══╝██╔════╝██╔════╝██║  ██║
          ██║   █████╗  ██║     ███████║
          ██║   ██╔══╝  ██║     ██╔══██║ 
          ██║   ███████╗╚██████╗██║  ██║   
          ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝
    
    Welcome to ${HOST}
    Powered by https://www.gada.io/

    ╦  ╦┌─┐┬─┐┌─┐┬┌─┐┌┐┌┌─┐ 
    ╚╗╔╝├┤ ├┬┘└─┐││ ││││└─┐ 
     ╚╝ └─┘┴└─└─┘┴└─┘┘└┘└─┘                                   
     
     frontend  
       - branch ${gitInfo.branch}
       - hash   ${gitInfo.commit.hash}
     api        ${apiUniq}
     `,
    'color: lightGreen;',
  )
}

const prettyLog = (msg, data = {}, style) => {
  const showConsoleLogs = showLogs()

  const title = data.items
    ? data.parentCode && data.questionCode
      ? `Rows - ${data.parentCode} - ${data.questionCode}`
      : data.parentCode
      ? `Rows - ${data.parentCode} `
      : msg
    : msg

  if (showConsoleLogs) {
    if (title === 'QBulkMessage') return

    if (data.cmd_type) {
      console.info(
        `%c${data.cmd_type}: ${data.code}`,
        style || 'padding: 1rem; font-size: 1rem; color: salmon;',
        '\n',
      )
      console.dir(data)

      return
    }

    if (data?.data_type === 'Ask') {
      console.info(`%c${title}`, style || 'padding: 1rem; font-size: 1rem; color: teal;', '\n')
      console.dir(data)
      return
    }

    if (includes('Rows -', title || '')) {
      console.info(
        `%c${title}`,
        style || 'padding: 1rem; font-size: 1rem; color: lightgreen;',
        '\n',
      )
      console.dir(data)
      return
    }

    console.info(`%c${title}`, style || 'padding: 1rem; font-size: 1rem; color: darkgreen', '\n')
    console.dir(data)
  }
}

export default prettyLog
export { initLog }
