// Set various document properties from configuration

import network_config from '../network-config'

export default {
  install(Vue, options) {
    // Document title from app name
    document.title = network_config.APP_NAME;

    // Network specific favicon
    var favicon = document.querySelector("link[rel*='icon']")
    favicon.href = process.env.BASE_URL +
                             "favicon-" +
     (network_config.BLOCKCHAIN == null ?
                           'blockchain' :
             network_config.BLOCKCHAIN) +
                                  ".ico";
  }
}
