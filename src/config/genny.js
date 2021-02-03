export const HOST = process.env.REACT_APP_ENV_GENNY_BRIDGE_URL || window.location.origin
export const VERTX_URL = `${HOST}/frontend`
export const INIT_URL = `${HOST}/api/events/init?url=${HOST}`
