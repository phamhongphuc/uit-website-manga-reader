<template>
    <div id="body" class="container mt-3 mt-sm-4 mt-md-5">
        <div class="row">
            <latest- class="col-24 col-md-15 col-lg-17" />
            <ranking- class="col-24 col-md-9 col-lg-7" />
        </div>
    </div>
</template>
<script>
import ranking from '~/components/custom/ranking.vue';
import latest from '~/components/custom/latest.vue';

export default {
    components: {
        'ranking-': ranking,
        'latest-': latest,
    },
    head() {
        return {
            title: 'Manga Scanlation',
        };
    },
};
</script>
