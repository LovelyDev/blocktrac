<template>
  <div id="main_title_container">
    <router-link to="/txs">
      <h2 id="main_title">
        <span id="main_title1">
          Zerp
        </span>

        <span id="main_title2">
          XRP Transaction Tracker
        </span>
      </h2>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MainTitle'
}
</script>

<style scoped>
#main_title_container{
  flex-grow: 1;
}

#main_title_container a{
  text-decoration: none;
}

#main_title{
  font-family: "Gilroy ExtraBold";
  margin-bottom: 0;
}

#main_layout.xs #main_title{
  font-size: 1.1rem;
}

#main_title1{
 color: #395267;
 font-weight: bold;
}

#main_title2{
  color: var(--theme-color1);
}
</style>
