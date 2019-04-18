<template>
    <div>
        <div class="control">
            <label
                class="radio"
                :for="name + index"
                v-for="(item, index) in items"
                :key="item.label"
            >
                <input
                    type="radio"
                    :id="name + index"
                    :name="name"
                    :value="item.value"
                    v-model="current"
                    @change="$emit('change', item.value)"
                >
                {{ item.label }}
            </label>
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