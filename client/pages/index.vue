<template>
    <div id="body" class="container">
        <div class="row">
            <book-items- class="col-12 col-md-8 py-3" />
            <comments- class="col-12 col-md-4 py-3" />
        </div>
    </div>
</template>
<script>
export default {
    components: {
        ...'~/components/pages/index/book-items.vue',
        ...'~/components/pages/index/comments.vue',
    },
    head() {
        return {
            title: 'Ai Scanlation',
        };
    },
    async asyncData({ store }) {
        await store.dispatch('book/fetchItems');
        return {};
    },
};
</script>
