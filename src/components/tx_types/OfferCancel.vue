<template>
  <TxContainer :tx="tx">
    <div class="account">
      <div>Account</div>
      <AccountLink :account="account" />
    </div>

    <template v-if="has_deleted_node">
      <div class="buy_amount">
        <div>Buying</div>
        <CurrencyAmount :amount="pays" />,
      </div>

      <div class="sell_amount">
        <div>Selling</div>

        <CurrencyAmount :amount="gets" />
      </div>
    </template>

    <template v-else>
      <div class="sequence">
        <div>Sequence</div>
        <div>{{sequence}}</div>
      </div>
    </template>
  </TxContainer>
</template>

<script>
import TxContainer    from '../TxContainer.vue'
import CurrencyAmount from '../CurrencyAmount.vue'
import AccountLink    from '../AccountLink.vue'

var HasTx = require('../../mixins/has_tx').default
export default {
  name   : 'OfferCancelTx',

  mixins : [HasTx],

  components : {
    TxContainer,
    CurrencyAmount,
    AccountLink
  },

  computed : {
    account : function(){
      return this.tx_obj["Account"];
    },

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

<style scoped>
.account{
  flex-basis: 45%;
  font-size: 0.8rem;
}

.buy_amount,
.sell_amount{
  flex-basis: 16%;
  font-size: 0.8rem;
}

.sequence{
  flex-basis: 93%;
}
</style>
