<template>
  <div id="my_filters">
    <h3>My filters</h3>

    <img src="../assets/my-filters-anon.png" class="mt-3"/>

    <p class="mt-3" style="color: #556475">
      Get notified when interesting transactions go through the network
    </p>

    <div id="personalized">
      <b>Set Personalized Filter</b>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyFilters'
}
</script>

<style scoped>
#my_filters{
  border: 1px solid #ececec;
  text-align: center;
  padding: 10px;
  background-color: white;
}

#personalized{
  background-color: #425265;
  color: white;
  border-radius: 15px;
  padding: 7px;
  cursor: pointer;
}
</style>
