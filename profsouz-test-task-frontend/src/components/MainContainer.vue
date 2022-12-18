<template>
  <div class="container">
    <div class="bar-chart-container" ref="barChartContainer">
      <svg class="bar-chart" ref="barChart" :width="this.barChartWidth" @mousedown="onDragAnDropBarChart($event)">
        <g class="bars-container" ref="bars-container"
           :transform="`translate(${this.BAR_GAP}, ${this.barChartClientHeight}) scale(1,-1)`">
          <rect v-for="(value, index) in data" :key="index" class="bar"
                :height="`${100 * value * this.barHeightScaleFactor}%`"
                :width="this.BAR_WIDTH"
                :x="index * (this.BAR_WIDTH + this.BAR_GAP)"
          ></rect>
        </g>
        <g>
          <circle cx="50" cy="50" r="50"/>
        </g>
      </svg>
    </div>
    <div class="button-controls">
      <button @click="onBarAdd">Add Bar</button>
      <button @click="onBarRemove">Remove Bar</button>
    </div>
    <div class="pagination-control" v-if="this.numPages > 1">
      <div class="page-control" @click="onPagingBarChart(pageNum)" v-for="pageNum in [...Array(this.numPages).keys()]"
           :key="pageNum">
        {{ pageNum + 1 }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.BAR_WIDTH = 50;
    this.BAR_GAP = 2;

    this.randomNumber = (min, max) => Math.floor(Math.random() * max) + min;
    this.resetToDefaultBarChart = () => {
      const barChart = document.querySelector(".bar-chart");
      barChart.style.left = '0px';
    }
  },

  mounted() {
    this.barChartClientHeight = this.$refs.barChart.clientHeight;
    this.barChartContainerClientWidth = this.$refs.barChartContainer.clientWidth;
    this.barsPerPage = Math.floor(this.barChartContainerClientWidth / (this.BAR_WIDTH + this.BAR_GAP));

  },

  data() {
    return {
      data: [34, 45, 56, 100, 230, 230, 47, 34, 45, 56, 100, 230, 230, 47, 34, 45, 56, 100, 230, 230, 47],

      barChartClientHeight: 1,
      barChartContainerClientWidth: 1,

      barsPerPage: 1,
      currentPage: 0,
    }
  },

  methods: {
    onBarAdd() {
      this.resetToDefaultBarChart();
      this.data.push(this.randomNumber(10, 400));
    },

    onBarRemove() {
      this.resetToDefaultBarChart();
      this.data.pop();
    },

    onPagingBarChart(pageNum) {
      this.resetToDefaultBarChart();
      this.$refs.barChartContainer.scrollTo(pageNum * this.barChartContainerClientWidth, 0);
    },

    onDragAnDropBarChart(e) {

      const barChart = e.currentTarget;
      const barsContainer = document.querySelector(".bars-container")

      let transformTranslate = Array.from(barsContainer.transform.baseVal).filter(SVGTransform => SVGTransform.type === 2)[0];
      let currentBarsContainerTranslateX = transformTranslate.matrix.e;

      let onMouseMove = function (e1) {
        transformTranslate.setTranslate(currentBarsContainerTranslateX + e1.offsetX - e.offsetX, transformTranslate.matrix.f);
      }

      barChart.onmouseup = function () {
        barChart.removeEventListener('mousemove', onMouseMove, {capture: true});
        this.onmouseup = null;
      }

      barChart.onmouseout = function (e2) {
        e2.stopImmediatePropagation();
        e2.stopPropagation();
        console.log("1", e2.currentTarget, e2.target)
        this.removeEventListener('mousemove', onMouseMove, {capture: true});
      }
      barsContainer.onmouseout = function (e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
      }

      // barChart.addEventListener("mousemove", onMouseMove, {capture: true});
      barChart.addEventListener("mousemove", onMouseMove, {capture: true});
    },
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

  border: 1px solid red;
}

.bar-chart-container {
  position: relative;
  height: 100%;
  overflow: hidden;

  border: 1px solid green;
}

.bar-chart {
  position: relative;
  height: 99%;
  left: 0px;
}

.bar {
  fill: red;
  y: 2;
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
