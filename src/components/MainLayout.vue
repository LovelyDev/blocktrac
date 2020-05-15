<template>
  <b-container fluid
               id="main_layout"
               class="p-0"
               :class="$mq">
    <ConnectionStatus />

    <b-row id="main_header_container">
      <b-col class="p-0">
        <MainHeader />
      </b-col>
    </b-row>

    <b-row no-gutters id="main_content" :class="section">
      <b-col>
        <div id="main_subcontent" :class="section">
          <slot></slot>
        </div>
      </b-col>
    </b-row>

    <MainFooter />
  </b-container>
</template>

<script>
import MainHeader       from './MainHeader'
import MainFooter       from './MainFooter'
import ConnectionStatus from './ConnectionStatus'

export default {
  name: 'MainLayout',

  components : {
    MainHeader,
    MainFooter,
    ConnectionStatus
  },

  props : {
    section : {
      type : String,
      required : true
    }
  }
}
</script>

<style scoped>
#main_layout{
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
}

#main_header_container{
  width: 100%;
}

#main_content{
  width: 100%;
  flex-grow: 1;
  padding-bottom: 10px;
  background-color: #f8f8f9;
  border-top: 1px solid var(--theme-color3);
}

#main_subcontent{
  width: 90%;
  margin: auto;
}

/* XXX: hacks for landing page */

#main_content.landing{
  padding-bottom: 0;
  margin-bottom: 10px;
}

#main_subcontent.landing{
  width: unset;
}
</style>
