<template>
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
</template>

<script>
export default {
  name: 'BatchSettingsForm',

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
</style>
