<template>
  <div>
    <template v-if="has_deleted_node">
      Cancelled Offer to buy <CurrencyAmount :amount="pays" />,
      Selling <CurrencyAmount :amount="gets" />
    </template>

    <template v-else>
      Cancelled Offer {{sequence}}
    </template>
  </div>
</template>

<script>
import CurrencyAmount from '../CurrencyAmount.vue'

var HasTx = require('../../mixins/has_tx').default
export default {
  name   : 'OfferCancelTx',

  mixins : [HasTx],

  components : {
    CurrencyAmount
  },

  computed : {
    sequence : function(){
      return this.tx_obj["OfferSequence"];
    },

    deleted_node : function(){
      if(!this.tx_meta)
        return null;

      for(var n = 0; n < this.tx_meta["AffectedNodes"].length; n += 1)
        if(this.tx_meta["AffectedNodes"][n]["DeletedNode"] &&
           this.tx_meta["AffectedNodes"][n]["DeletedNode"]["LedgerEntryType"] == "Offer")
          return this.tx_meta["AffectedNodes"][n]["DeletedNode"]["FinalFields"];

      return null;
    },
 
    has_deleted_node : function(){
      return !!this.deleted_node;
    },

    gets : function(){
      return this.deleted_node["TakerGets"];
    },

    pays : function(){
      return this.deleted_node["TakerPays"];
    }
  }
}
</script>
