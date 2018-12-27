<template>
  <div class="table-responsive">
    <table class="table table-striped table-sm" id="dataTable">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            {{ header.name }}
            <div class="form-group form-check">
              <input
                type="checkbox"
                class="form-check-input"
                :id="'use'+ header.name"
                v-model="header.use"
              >
              <label class="form-check-label" :for="'use'+ header.name">Use</label>
            </div>

            <div class="form-check form-check-inline">
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
            <div class="form-check form-check-inline">
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
        <tr v-for="(row, index) in dataset" :key="index">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
        </tr>
      </tbody>
    </table>...
  </div>
</template>

<script>
export default {
  props: ["dataset", "headers"]
};
</script>