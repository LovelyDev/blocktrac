import Network from './mixins/network'

// Set various document properties from vuejs variables

export default {
  install(Vue, options) {
    // Document title from app name
    document.title = Network.computed.app_name()

    // Network specific favicon
    var favicon = document.querySelector("link[rel*='icon']")
    favicon.href = process.env.BASE_URL + "favicon-" + Network.computed.network() + ".ico";
  }
}
