<template>
  <b-container fluid class="p-0" id="main_layout">
    <b-row no-gutters>
      <b-col></b-col>

      <MainHeader />
    </b-row>

    <b-row no-gutters id="main_content">
      <b-col>
        <slot></slot>
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
  min-height: 100%;
}

#main_about{
  margin-left: 5px;
}

#main_content{
  flex-grow: 1;
}
</style>
