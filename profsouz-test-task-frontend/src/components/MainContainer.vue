<template>
  <div class="container">
    <div class="bar-chart-container">
      <svg class="bar-chart" ref="barChart" :width="this.barChartWidth">
        <g v-for="(value, index) in data" :key="index">
          <rect class="bar"
                :width="this.barWidth"
                :height="100 * value * this.barHeightScaleFactor + '%'"
                :x="index * (this.barWidth + 1)"
          ></rect>
        </g>
      </svg>
    </div>
    <div class="button-controls">
      <button @click="this.data.push(300)">Add Bar</button>
      <button @click="this.data.pop()">Remove Bar</button>
    </div>
    <div class="pagination-control">
      <div>Paging</div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log("created");
  },

  mounted() {
    console.log("mounted")

    this.barWidth = parseInt(window.getComputedStyle(document.querySelector(".bar"))["width"]);
    this.barChartClientHeight = this.$refs.barChart.clientHeight;
  },

  data() {
    console.log("data")

    return {
      data: [300, 4, 50, 45, 90, 320, 80, 300, 4, 50, 45, 90, 320, 380, 300, 4, 50, 45, 90, 320, 380, 300, 4, 50, 45, 90, 320, 380],

      barChartClientHeight: 1,
      barWidth: 1
    }
  },

  computed: {
    barChartWidth() {
      return this.data.length * this.barWidth + this.data.length;
    },

    barHeightScaleFactor() {
      let maxElement = Math.max.apply(null, this.data);
      return maxElement > this.barChartClientHeight ? 1 / maxElement : 1 / this.barChartClientHeight;
    }
  }
}

</script>

<style scoped>

.container {
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 50vw;
  height: 30vh;

  border: 1px solid gray;
}

.bar-chart-container {
  position: relative;
  height: 100%;
  overflow: auto;
}

.bar-chart {
  height: 99%;
  margin: 10px;
}

.bar {
  width: 20px;
  fill: red;
  y: 0;
}

.button-controls{
  display: flex;
  justify-content: center;
  gap: 10px;

  border: 1px solid gray;
}

.pagination-control{
  display: flex;
  justify-content: center;
}

</style>
