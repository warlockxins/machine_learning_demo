<template>
  <div class="table-responsive">
    <table class="table table-striped table-sm table-bordered table-hover">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            <div class="form-group form-check">
              <input
                type="checkbox"
                class="form-check-input"
                :id="'use'+ header.name"
                v-model="header.use"
              >
              <label
                class="form-check-label"
                :class="{'text-muted': !header.use}"
                :for="'use'+ header.name"
              >{{ header.name }}</label>
            </div>
          </th>
        </tr>
        <!-- toggles for input/output -->
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            <div v-if="header.use" class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                :name="'header' + header.name"
                :id="'fieldRadio1'+header.name"
                value="in"
                checked
                v-model="header.select"
              >
              <label class="form-check-label" :for="'fieldRadio1'+header.name">input</label>
            </div>
            <div v-if="header.use" class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                :name="'header' + header.name"
                :id="'fieldRadio2'+header.name"
                value="out"
                v-model="header.select"
              >
              <label class="form-check-label" :for="'fieldRadio2'+header.name">output</label>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, index) in currentDataset"
          :key="index"
          v-on:click="$emit('testRecord', row)"
        >
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            :class="{'text-body': headers[cellIndex].use, 'text-muted': !headers[cellIndex].use }"
          >{{ cell }}</td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" v-if="hasPrevious">
          <a class="page-link" href="#" v-on:click.prevent.stop="current--" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li
          class="page-item"
          :class="{'active': index === current}"
          v-for="(_, index) in pages"
          :key="index"
        >
          <a class="page-link" href="#" v-on:click.prevent.stop="current = index">{{ index + 1 }}</a>
        </li>

        <li class="page-item" v-if="hasNext">
          <a class="page-link" href="#" v-on:click.prevent.stop="current++" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["dataset", "headers"],
  computed: {
    pages: function() {
      if (!this.dataset) {
        return 0;
      }
      if (this.dataset.length > 10) {
        return Math.floor(this.dataset.length / 10);
      }
    },
    hasNext: function() {
      return this.current < this.pages - 1;
    },
    hasPrevious: function() {
      return this.current > 0;
    },
    currentDataset: function() {
      const start = Math.max(1, this.current) * 10;
      return this.dataset.slice(start, start + 10);
    }
  },
  data: () => {
    return {
      current: 0
    };
  }
};
</script>