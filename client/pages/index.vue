<template>
    <div id="body" class="container mt-3 mt-sm-4 mt-md-5">
        <div class="row">
            <div class="main-left col-12 col-md-8">
                <div class="row">
                    <div
                        v-for="(item, index) in items"
                        :key="index"
                        class="col-12 p-3"
                    >
                        <book-item- :item="item" />
                    </div>
                </div>
            </div>
            <div
                class="main-right col-12 col-md-4 bg-dribbble vh-100"
                style="opacity: 0.2"
            />
        </div>
    </div>
</template>
<script>
import axios from '~/plugins/axios';

export default {
    components: {
        ...'~/components/book/book-item.vue',
    },
    head() {
        return {
            title: 'Ai Scanlation',
        };
    },
    async asyncData() {
        return {
            items: (await axios.get('api/dev/mangas')).data,
        };
    },
};
</script>
