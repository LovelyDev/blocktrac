/*
 * Zitui Application network configuration
 *
 * Copyright (c) 2021 Dev Null Productions - All Rights Reserved
 */

// Network to connect to.
// Supported: null, xrp_mainnet, xlm_mainnet
const NETWORK = null;
//const NETWORK = 'xrp_mainnet';
// const NETWORK = 'xlm_mainnet';

// Network Endpoints
const NETWORK_URIS = {
  'xrp_mainnet' : "wss://s2.ripple.com:443",
  'xlm_mainnet' : "https://horizon.stellar.org"
};

// Default networks
const DEFAULT_NETWORKS = {
  'xrp' : 'xrp_mainnet',
  'xlm' : 'xlm_mainnet'
}

///

// Blockchain identifier
const BLOCKCHAIN = NETWORK ?
     NETWORK.split("_")[0] :
                       null;

// Supported blockchains
const BLOCKCHAINS = ['xrp', 'xlm'];

// Default blockchain
const DEFAULT_BLOCKCHAIN = BLOCKCHAINS[0];

///

// Application names
// XXX: synchronize w/ appname in ziti/util
const APP_NAMES = {
  'xrp' : 'Zerp Tracker',
  'xlm' : 'Stracker',
   null : 'Block Trac'
}

// Application name emphasises,
// index before which emphasis will be added
const APP_NAME_EMPHASISES = {
  'xrp' : 4,
  'xlm' : 1,
   null : 5
};

// Applicaton name
const APP_NAME = APP_NAMES[BLOCKCHAIN];

// Application name emphasis
const APP_NAME_EMPHASIS = APP_NAME_EMPHASISES[BLOCKCHAIN];

///

module.exports = {
  NETWORK : NETWORK,

  NETWORK_URIS : NETWORK_URIS,

  DEFAULT_NETWORKS : DEFAULT_NETWORKS,

  BLOCKCHAIN : BLOCKCHAIN,

  BLOCKCHAINS : BLOCKCHAINS,

  DEFAULT_BLOCKCHAIN : DEFAULT_BLOCKCHAIN,

  APP_NAME : APP_NAME,

  APP_NAME_EMPHASIS
}
