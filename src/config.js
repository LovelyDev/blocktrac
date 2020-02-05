module.exports = {
  // Backend URL to get/set data
  BACKEND_URL : "http://localhost:3000",

  // Used for account links and similar
  XRP1NTEL_URL : "https://xrp1ntel.com",

  // Ripple Websocket URI
  RIPPLE_WS : "wss://s2.ripple.com:443",

  // Number of TXs to retain in history
  TX_HISTORY : 75,

  // From the XRP Protocol
  DROPS_PER_XRP : 1000000,

  // TODO other currency unicodes (or replace all w/ SVG icons?)
  CURRENCY_UNICODES : {
    'USD' : '&#36;',
    'CNY' : '&#165;',
    'JPY' : '&#165;',
    'BTC' : '&#8383;',
    'GBP' : '&#163;',
    'EUR' : '&euro;'
  }
}
