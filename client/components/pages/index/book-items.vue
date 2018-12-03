<template>
    <div>
        <div class="row px-2">
            <b-button
                v-for="(set, index) in ['Recommended', 'Popular', 'Latest']"
                :key="index"
                class="m-2 shadow"
                size="md"
                :variant="select === set ? 'main' : 'white'"
                @click="select = set"
            >
                {{ set }}
            </b-button>
        </div>
        <div class="row px-2">
            <div v-for="(item, index) in items" :key="index" class="col-12 p-2">
                <book-item- :item="item" />
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    components: {
        ...'~/components/book/book-item.vue',
    },
    data() {
        return {
            select: 'recommended',
        };
    },
    computed: {
        ...mapState({
            items: state => state.book.items,
        }),
    },
};
</script>
<style lang="scss">
//@at-root
</style>
