<template>
  <b-container fluid class="p-0" id="main_layout">
    <MainHeader />

    <b-row no-gutters id="main_content">
      <b-col>
        <div id="main_subcontent">
          <slot></slot>
        </div>
      </b-col>
    </b-row>

    <MainFooter />
  </b-container>
</template>

<script>
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'

export default {
  name: 'MainLayout',

  components : {
    MainHeader,
    MainFooter
  },

  props : {
    section : String,
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

#main_content{
  width: 100%;
  flex-grow: 1;
  background-color: #f8f8f9;
  border-top: 1px solid #ececec;
}

#main_subcontent{
  width: 85%;
  margin: auto;
}
</style>
