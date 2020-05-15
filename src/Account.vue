<template>
  <TxsLayout section="account">
    <div id="account">
      <div id="account_header">
        <div id="back_icon" @click="$router.back()">
          <img src="./assets/left-arrow-blue.svg" />
        </div>

        <div id="account_subheader">
          <div id="account_title">Account</div>
          <div id="account_id"><h5>{{id}}</h5></div>
        </div>
      </div>

      <div id="account_details">
        <table id="account_table">
          <tr>
            <td class="label">Balance</td>
            <td class="value">
              {{balance | round | delim}} <img src="./assets/currencies/XRP.svg" width="15px" />
            </td>
          </tr>

          <tr>
            <td class="label">Flags</td>
            <td class="value">
              {{flags}}
            </td>
          </tr>

          <tr>
            <td class="label">Sequence</td>
            <td class="value">
              {{sequence}}
            </td>
          </tr>

          <tr>
            <td class="label">Last TX</td>
            <td class="value">
              <router-link :to="'/tx/' + previous_txn">{{previous_txn}}</router-link>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </TxsLayout>
</template>

<script>
import TxsLayout         from './components/TxsLayout'
import CommandDispatcher from './mixins/command_dispatcher'

import config from "./config"

export default {
  name: 'Account',

  mixins : [CommandDispatcher],

  components: {
    TxsLayout
  },

  props : {
    id : String
  },

  data : function(){
    return {
       balance : 0,
         flags : 0,
      sequence : 0,
      previous_txn : ''
    }
  },

  methods : {
    msg_cb : function(message){
      if(!message["result"]) return;

      const account_data = message["result"].account_data
           this.balance = parseInt(account_data.Balance)/config.DROPS_PER_XRP
             this.flags = account_data.Flags
          this.sequence = account_data.Sequence
      this.previous_txn = account_data.PreviousTxnID
    }
  },

  created : function(){
    this.$store.commit('on_socket_message', this.msg_cb);
    this.$store.commit('on_open_socket', function(){
      var cmd = {
        'command' : 'account_info',
        'account' : this.id
      };

      this.sendCmd(cmd);
    }.bind(this));
  },

  destroyed : function(){
    this.$store.commit('rm_socket_message_cb', this.msg_cb);
  }
}
</script>

<style scoped>
#account{
  height: 100%;
  display: flex;
  flex-direction: column;
}

#account_header{
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

#back_icon{
  flex-basis: 7%;
  cursor: pointer;
  margin-right: 5px;
}

#account_header img{
  width: 55px;
  background-color: white;
  padding: 15px;
  border-radius: 35px;
}

#account_subheader{
  word-wrap: anywhere;
}

#account_title{
  color: var(--theme-color2);
  opacity: 0.6;
  font-family: var(--theme-font2);
}

#account_id{
  font-family: var(--theme-font3);
  color: var(--theme-color2);
  font-weight: bold;
}

#account_details{
  border: 1px solid var(--theme-color3);
  background-color: white;
  padding: 25px;
  flex-grow: 1;
}

#account_table{
  width: 100%;
}

.label{
  font-weight: bold;
}

.value{
  text-align: right;
}
</style>
