<template>
    <div id="body" class="container mt-3 mt-sm-4 mt-md-5">
        <div class="row">
            <div v-for="(item, index) in items" :key="index" class="col-6 p-2">
                <book-item- :item="item" />
            </div>
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
