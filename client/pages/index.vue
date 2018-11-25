<template>
    <div id="body" class="container mt-3 mt-sm-4 mt-md-5">
        <div class="row" />
    </div>
</template>
<script>
import axios from '~/plugins/axios';

export default {
    components: {},
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
