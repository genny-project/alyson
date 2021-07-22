interface Credentials {
  secret?: string
}

interface PolicyEnforcer {}

interface ApiConfig {
  realm?: string
  'auth-server-url'?: string
  'ssl-required'?: string
  resource?: string
  credentials?: Credentials
  'policy-enforcer'?: PolicyEnforcer
  vertx_url?: string
  api_url?: string
  url?: string
  clientId?: string
  projectTheme: any
  ENV_GENNY_HOST?: string
  ENV_GENNY_INITURL?: string
  ENV_GENNY_BRIDGE_PORT?: string
  ENV_GENNY_BRIDGE_VERTEX?: string
  ENV_MEDIA_PROXY_URL?: string
  ENV_GENNY_BRIDGE_SERVICE?: string
  ENV_GENNY_BRIDGE_EVENTS?: string
  ENV_GOOGLE_MAPS_APIKEY?: string
  PRI_FAVICON?: string
  PRI_NAME?: string
  ENV_GOOGLE_MAPS_APIURL?: string
  ENV_UPPY_URL?: string
  ENV_KEYCLOAK_REDIRECTURI?: string
  ENV_APPCENTER_ANDROID_SECRET?: string
  ENV_APPCENTER_IOS_SECRET?: string
  ENV_ANDROID_CODEPUSH_KEY?: string
  ENV_LAYOUT_PUBLICURL?: string
  ENV_GUEST_USERNAME?: string
  ENV_GUEST_PASSWORD?: string
  ENV_SIGNATURE_URL?: string
  ENV_USE_CUSTOM_AUTH_LAYOUTS?: string
  ENV_LAYOUT_QUERY_DIRECTORY?: string
}

export default ApiConfig
