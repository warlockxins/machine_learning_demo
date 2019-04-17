<template>
    <div>
        <div class="form-check form-check-inline" v-for="(item, index) in items" :key="item.label">
            <input
                class="form-check-input"
                type="radio"
                :id="name + index"
                :name="name"
                :value="item.value"
                v-model="current"
                @change="$emit('change', item.value)"
            >
            <label class="form-check-label" :for="name + index">{{ item.label }}</label>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // items are:
        // {value, label}
        items: Array,
        value: Boolean,
        name: String
    },
    data: function() {
        return {
            current: this.value
        };
    }
};
</script>