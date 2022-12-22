<template>
  <div class="container">
    <BarChart/>
    <PagingControllers/>
  </div>
</template>

<script>

import PagingControllers from "@/components/PagingControllers";
import BarChart from "@/components/BarChart";

export default {
  components: {PagingControllers, BarChart},

}
</script>

<style scoped>

.container {
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 60vw;
  height: 40vh;
}


</style>
