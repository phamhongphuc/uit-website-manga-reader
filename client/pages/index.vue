<template>
    <div id="body" class="container mt-3 mt-sm-4 mt-md-5">
        <div class="row">
            <div v-for="(item, index) in items" :key="index" class="col-4 p-2">
                <ratio-box- :dx="3" :dy="5">somehting</ratio-box->
            </div>
        </div>
    </div>
</template>
<script>
import axios from '~/plugins/axios';

export default {
    components: {
        ...'~/components/utilities/ratio-box.vue',
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
