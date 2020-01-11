<template>
  <MainLayout section="about">
    <div id="about">
      <h1 style="text-align: center">About</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut accumsan libero. Integer ullamcorper odio sit amet dui efficitur vulputate. Nulla id faucibus quam. Cras interdum mauris laoreet dolor pellentesque gravida. Nulla facilisis mauris vel vestibulum sagittis. Vestibulum vel dolor sed odio gravida facilisis. Suspendisse potenti. Cras ut convallis odio. Curabitur ultricies suscipit diam non feugiat. Duis ex mi, placerat quis suscipit in, rhoncus quis mi. Donec sit amet vulputate nibh, quis convallis erat. Aliquam vitae dolor fringilla, interdum mauris quis, pretium nisl. Aliquam vel mi at augue fringilla rutrum hendrerit mollis odio. Nulla facilisi. Nam sit amet augue laoreet, faucibus tortor eget, molestie ante. Etiam commodo ut dolor nec molestie.
      </p>

      <p>
        Etiam vehicula augue ac mattis venenatis. Ut bibendum metus urna, sit amet feugiat lorem varius a. Nam aliquam lobortis facilisis. Fusce facilisis molestie tristique. Nunc eu molestie justo. Praesent placerat mi sem, sit amet dignissim ipsum porta sit amet. Integer id dui rutrum, dapibus elit vitae, aliquet metus. Curabitur bibendum varius ante nec cursus.
      </p>

      <p>
        Pellentesque aliquam nec nunc eget commodo. Mauris eget elit sit amet turpis blandit mollis sit amet id libero. Suspendisse vulputate ipsum sit amet quam ullamcorper, sit amet tempor nunc euismod. Integer varius dolor ac nisl semper ornare. Proin nec semper nulla, sodales volutpat est. Aliquam eget pulvinar ex, eu condimentum ipsum. Nunc rutrum justo et tellus blandit accumsan. Morbi molestie lobortis iaculis. Nullam feugiat, dui vitae cursus maximus, lectus eros hendrerit mauris, non volutpat tellus libero ut est. Sed elementum pretium justo, sed vehicula sapien viverra sagittis. Morbi vestibulum eros quis velit vestibulum lobortis.
      </p>

      <p>
        Proin ut eleifend arcu, porttitor suscipit ipsum. Phasellus tincidunt volutpat est non ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum laoreet ligula felis, nec aliquam mi suscipit vitae. Proin eleifend neque eu urna dictum volutpat. Sed suscipit condimentum erat vel lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit finibus fringilla. Integer tempus odio volutpat, molestie nunc non, consectetur risus. Duis mattis lectus eu erat molestie, vitae posuere neque tincidunt. Phasellus elit massa, commodo et bibendum ullamcorper, consequat et nibh. Sed vel tortor eros.
      </p>

      <p>
        Pellentesque mattis dictum fermentum. Quisque commodo enim quis pellentesque lacinia. In varius nunc ac sem consectetur molestie. Suspendisse facilisis neque quis magna hendrerit rhoncus. Curabitur urna arcu, tincidunt at tortor eget, porta eleifend justo. Maecenas commodo, leo et congue tristique, quam nunc mattis lacus, et dapibus lectus eros tincidunt est. Morbi tellus diam, iaculis quis sem ac, mollis semper purus.
      </p>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout.vue'

export default {
  name: 'About',
  components: {
    MainLayout
  }
}
</script>

<style>
#about{
  border: 1px solid black;
  width: 50%;
  margin: auto;
  margin-bottom: 25px;
  padding: 15px;
}
</style>
