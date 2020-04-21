<template>
  <div id="batch_settings">
    <h4 id="batch_size_title">Batch:</h4>

    <div id="batch_size_explanation">
    Controls how many transactions to queue up before you receive a notification.
    </div>

    <div>
      <b-form-group>
        <b-form-radio-group id="batch_size"
                            v-model="batch_size"
                            :options="batch_sizes" buttons />
      </b-form-group>
    </div>

    <div id="batch_size_summary" v-if="batch_size == 'instant'">
    Receive notifications instantly
    </div>

    <div id="batch_size_summary" v-else>
    Receive notifications after <b>{{batch_size}}</b> transactions
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
  font-family: var(--theme-font1);
}

#batch_size_title{
  font-family: var(--theme-font5);
}

#batch_size{
  display: flex;
  margin-top: 10px;
}

#batch_size_summary{
  margin-bottom: 15px;
  text-align: center;
  font-size: 0.9rem;
}
</style>

<style>
#batch_size .btn{
  background-color: var(--theme-color6);
  color: black;
  border: 1px solid #D7DDE0
}

#batch_size .btn.active{
  background-color: var(--theme-color1);
  color: white;
}
</style>
