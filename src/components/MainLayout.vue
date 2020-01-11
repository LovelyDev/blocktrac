<template>
  <b-container fluid class="p-0" id="main_layout">
    <b-row no-gutters>
      <b-col></b-col>

      <b-col cols="3" id="main_header">
        <b-row no-gutters>
          <b-col>
            <router-link to="/"><h1>To XRPL</h1></router-link>
          </b-col>
        </b-row>

        <b-row no-gutters>
          <b-col>
            <h5>XRP Transaction Tracker</h5>
          </b-col>
        </b-row>

        <b-row no-gutters>
          <b-col>
            <router-link to="/filters">Filters</router-link>
          </b-col>

          <b-col>
            <router-link to="/profile">Profile</router-link>
          </b-col>

          <b-col>
            <router-link to="/help">Help</router-link>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row no-gutters id="main_content">
      <b-col>
        <slot></slot>
      </b-col>
    </b-row>

    <b-row no-gutters id="main_footer">
      <b-col>
        © 2019 Dev Null Productions LLC | All Rights Reserved 

        <span id="main_about">
          <sup><router-link to="/about">About</router-link></sup>
        </span>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'MainLayout',
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

#main_header{
  text-align: center;
}

#main_content{
  flex-grow: 1;
}

#main_footer{
  text-align: center;
}
</style>
