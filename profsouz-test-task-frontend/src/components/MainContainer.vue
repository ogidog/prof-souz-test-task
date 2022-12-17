<template>
  <div class="container">
    <div class="bar-chart-container" ref="barChartContainer">
      <svg class="bar-chart" ref="barChart" :width="this.barChartWidth">
        <g v-for="(value, index) in data" :key="index"
           :transform="`translate(${this.BAR_GAP}, ${this.barChartClientHeight}) scale(1,-1)`">
          <rect class="bar"
                :height="`${100 * value * this.barHeightScaleFactor}%`"
                :width="this.BAR_WIDTH"
                :x="index * (this.BAR_WIDTH + this.BAR_GAP)"
          ></rect>
        </g>
      </svg>
    </div>
    <div class="button-controls">
      <button @click="this.data.push(this.randomNumber(10, 400))">Add Bar</button>
      <button @click="this.data.pop()">Remove Bar</button>
    </div>
    <div class="pagination-control" v-if="this.numPages > 1">
      <div class="page-control" @click="scrollBarChart(pageNum)" v-for="pageNum in [...Array(this.numPages).keys()]"
           :key="pageNum">
        {{ pageNum + 1 }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log("created");

    this.BAR_WIDTH = 50;
    this.BAR_GAP = 2;

    this.randomNumber = (min, max) => Math.floor(Math.random() * max) + min;
  },

  mounted() {
    console.log("mounted")

    this.barChartClientHeight = this.$refs.barChart.clientHeight;
    this.barChartContainerClientWidth = this.$refs.barChartContainer.clientWidth;
    this.barsPerPage = Math.floor(this.barChartContainerClientWidth / (this.BAR_WIDTH + this.BAR_GAP));

  },

  data() {
    console.log("data")

    return {
      data: [300, 380, 200, 300, 287, 200, 100, 84, 25, 450, 300, 380, 200, 300, 287, 200, 100, 84, 25, 450, 300, 380,
        200, 300, 287, 200, 100, 84, 25, 450, 300, 380, 200, 300, 287, 200, 100, 84, 25, 450, 300, 380, 200, 300, 287, 200, 100, 84, 25, 450,],

      barChartClientHeight: 1,
      barChartContainerClientWidth: 1,

      barsPerPage: 1,
      currentPage: 0,
    }
  },

  methods: {
    scrollBarChart(pageNum) {
      this.$refs.barChartContainer.scrollTo(pageNum * this.barChartContainerClientWidth, 0)
    }
  },

  computed: {
    barChartWidth() {
      return this.data.length * this.BAR_WIDTH + this.BAR_GAP * this.data.length;
    },

    barHeightScaleFactor() {
      let maxElement = Math.max.apply(null, this.data);
      return maxElement > this.barChartClientHeight ? 1 / maxElement : 1 / this.barChartClientHeight;
    },

    numPages() {
      return Math.ceil(this.data.length / this.barsPerPage)
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

}

.bar-chart-container {
  position: relative;
  height: 100%;
  overflow: auto;
}

.bar-chart {
  height: 99%;
}

.bar {
  fill: red;
  y: 2;
}

.bar-label {
  font-size: 1em;
}

.button-controls {
  display: flex;
  justify-content: center;
  gap: 10px;

  margin: 5px;

}

.pagination-control {
  display: flex;
  justify-content: center;
  gap: 10px;

  margin: 5px;
}

.page-control {
  cursor: pointer;
}

</style>
