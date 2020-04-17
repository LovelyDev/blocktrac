<template>
  <b-modal id="settings_modal"
           title="Filter Settings"
           ok-title="Save"
           ok-only>
    <div id="batch_settings">
      <div v-if="batch_size == 'instant'">
      Sent me notifications instantly
      </div>

      <div v-else>
      Send me notifications after <b>{{batch_size}}</b> transactions
      </div>

      <div>
        <b-form-group>
          <b-form-radio-group id="batch_size"
                              v-model="batch_size"
                              :options="batch_sizes" buttons />
        </b-form-group>
      </div>
    </div>

    <div id="sinks">
      <div>
      Send me notifications via
      </div>

      <table>
        <tr>
          <td>Email</td>

          <td><input type="text" /></td>
        </tr>

        <tr v-if="advanced_sinks_disabled">
          <td></td>

          <td>
            Available with <span class="pro">Pro</span> plans
          </td>
        </tr>

        <tr>
          <td>Text Message</td>

          <td>
            <input type="text"
                   :disabled="advanced_sinks_disabled" />
          </td>
        </tr>

        <tr>
          <td>URL</td>

          <td>
            <input type="text"
                   :disabled="advanced_sinks_disabled" />
          </td>
        </tr>
      </table>

      <div id="sinks_footer">
        <div>
          {{remaining_sinks}} are left.
        </div>

        <div>
          To create more, purchase a <span class="pro">Pro</span> plan.
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import Authentication from '../../mixins/authentication'

export default {
  name: 'SettingsModal',

  mixins : [Authentication],

  data : function(){
    return {
      // TODO from user profile
      batch_size : 5,

      // TODO: from config, profile (disable instant)
      batch_sizes : [
        { text : 'Instant', value : 'instant' },
        { text : '5',       value : 5  },
        { text : '10',      value : 10 },
        { text : '15',      value : 15 },
        { text : '20',      value : 20 },
        { text : '25',      value : 25 },
      ]
    }
  },

  computed : {
    // TODO: more elegant solution,
    //       deduce from fr0xrpl MEMBERSHIP_LEVEL config
    advanced_sinks_disabled : function(){
      return this.is_basic_member;
    },

    remaining_sinks : function(){
      // TODO
      return "2 available sinks"
    }
  }
}
</script>

<style scoped>
#batch_settings{
  border-bottom: 1px solid var(--theme-color3);
}

#batch_size{
  display: flex;
  margin-top: 10px;
}

#sinks{
  margin-top: 10px;
}

#sinks table{
  width: 100%;

  border-collapse:separate;
  border-spacing: 0 15px;
}

#sinks input{
  width: 100%;
}

#sinks_footer{
  font-size: 0.75rem;
}

.pro{
  border-radius: 15px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #eff2f8;
  color: #629ffb;
}
</style>
