import axios from 'axios'
import { API_VERSION_URL, HOST } from 'config/genny'
import { version } from '../../package.json'
import { map, mergeAll, head, compose, keys, addIndex, values, uniq } from 'ramda'

const useLogs = process.env.NODE_ENV === 'development' || window.localStorage.getItem('logs')

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
     
     frontend  ${version}
     api       ${apiUniq}
     `,
    'color: lightGreen;',
  )
}

const prettyLog = (msg, data, style) =>
  useLogs && console.info(`%c${msg}`, style || 'padding: 1rem', '\n', data)

export default prettyLog
export { initLog }
