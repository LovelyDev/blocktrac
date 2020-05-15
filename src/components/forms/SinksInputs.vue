<template>
  <!-- TODO advanced sinks controls, save filters on change -->
  <table class="form_table">
    <tr>
      <td>
        <b-form-checkbox v-if="!no_toggle"
                         v-model="enable_email"
                         class="form_switch"
                         switch>
          Email
        </b-form-checkbox>

        <span v-else>
          Email
        </span>
      </td>

      <td class="input_col">
        <input type="text"
               v-model="email_sinks"
               :disabled="!enable_email"
               class="form_input" />
      </td>
    </tr>

    <tr v-if="advanced_sinks_disabled">
      <td></td>

      <td id="available_with_pro">
        Available with <span class="pro">Pro</span> plans
      </td>
    </tr>

    <tr>
      <td>
        <b-form-checkbox v-if="!no_toggle"
                         v-model="enable_sms"
                         class="form_switch"
                         switch
                         :disabled="advanced_sinks_disabled">
          Text Message
        </b-form-checkbox>

        <span v-else>
          Text Message
        </span>
      </td>

      <td class="input_col">
        <input type="text"
               v-model="sms_sinks"
               :disabled="advanced_sinks_disabled || !enable_sms"
               class="form_input" />
      </td>
    </tr>

    <tr>
      <td>
        <b-form-checkbox v-if="!no_toggle"
                         v-model="enable_webhook"
                         class="form_switch"
                         switch
                         :disabled="advanced_sinks_disabled">
          URL
        </b-form-checkbox>

        <span v-else>
          URL
        </span>
      </td>

      <td class="input_col">
        <input type="text"
               v-model="webhook_sinks"
               :disabled="advanced_sinks_disabled || !enable_webhook"
               class="form_input" />
      </td>
    </tr>

    <tr id="sinks_footer">
      <td colspan="2">
        <div>{{remaining_sinks_msg}}</div>
        <div>To create more, purchase a <span class="pro">Pro</span> plan.</div>
      </td>
    </tr>
  </table>
</template>

<script>
import Authentication from '../../mixins/authentication'
import ServerAPI      from '../../mixins/server_api'

export default {
  name: 'SinksInputs',

  mixins : [Authentication, ServerAPI],

  props : {
    no_toggle : Boolean
  },

  data : function(){
    return {
      enable_email : false,
      enable_sms : false,
      enable_webhook : false,

      email_sinks : '',
      sms_sinks : '',
      webhook_sinks : ''
    };
  },

  computed : {
    advanced_sinks_disabled : function(){
      return !this.logged_in || !this.membership_features.advanced_sinks
    },

    remaining_sinks : function(){
      return this.authorized_sinks - this.sinks.length;
    },

    remaining_sinks_msg : function(){
      const remaining = this.remaining_sinks;

      if(remaining == 1)
        return "1 available sink is left"

      return remaining + " available sinks are left"
    }
  },

  created : function(){
    if(this.no_toggle){
      this.enable_email = true
      this.enable_sms = this.membership_features.advanced_sinks
      this.enable_webhook = this.membership_features.advanced_sinks
    }

    this.load_sinks()
  }
}
</script>

<style scoped>
.input_col{
  width: 75%;
}

#available_with_pro{
  font-family: var(--theme-font4);
}

.pro{
  border-radius: 15px;
  padding: 3px 10px;
  background-color: var(--theme-color5);
  color: white;
  opacity: 0.6;
  font-family: var(--theme-font2);
  font-size: 0.8rem;
}


#sinks_footer td{
  padding-top: 10px;
  font-size: 0.75rem;
  font-family: var(--theme-font4);
}
</style>
