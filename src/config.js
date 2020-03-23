module.exports = {
  // Balance needed to be considered a premium account (in USD)
  MINUMUM_PREMIUM_BALANCE : 5,

  // Membership tiers, rates, and payment plans
  // TODO: edit these numbers
  MEMBERSHIP_LEVELS : {
    basic : {
      num_filters : 5,
      num_sinks_per_filter: 1,
      min_tx_batch : 5,
      max_tx_batch : 10,
      min_alert_interval : 15 // in minutes
    },

    premium : {
      monthly_filter_cost: 1,
      monthly_sink_cost:   1,
      monthly_sink_per_filter_cost : 0.5,
      min_alert_interval : 1, // in minutes
      monthly_alert_cost : 3,
      instant_alert_cost : 10
    },
  },

  // Backend URL to get/set data
  // TODO: load from config and/or change to fr.0xr.pl in production
  BACKEND_URL : "http://localhost:3000",

  // Used for account links and similar
  XRP1NTEL_URL : "https://xrp1ntel.com",

  // Ripple Websocket URI
  RIPPLE_WS : "wss://s2.ripple.com:443",

  // Number of TXs to retain in history
  TX_HISTORY : 75,

  // Categories TXs fall in to
  TX_CATEGORIES : [
    'ALL',
    'PAYMENTS',
    'OFFERS',
    'ESCROWS',
    'PAYMENT CHANNELS',
    'ACCOUNT SETS',
    'TRUST LINES'
  ],

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
