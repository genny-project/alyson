import axios from 'axios'
import { API_VERSION_URL, HOST } from 'config/genny'
import { map, mergeAll, head, compose, keys, addIndex, values, uniq, includes } from 'ramda'
import GitInfo from 'react-git-info/macro'
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
  const title = data.items
    ? data.items.length === 1
      ? data.items[0]?.name
      : data.parentCode
      ? `Rows - ${data.parentCode}`
      : msg
    : msg

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
    console.info(`%c${title}`, style || 'padding: 1rem; font-size: 1rem; color: lightgreen;', '\n')
    console.dir(data)
    return
  }

  console.info(`%c${title}`, style || 'padding: 1rem; font-size: 1rem; color: darkgreen', '\n')
  console.dir(data)
}

export default prettyLog
export { initLog }
