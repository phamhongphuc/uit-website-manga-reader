<template>
    <div id="body" class="container">
        <div class="row">
            <div class="main-left col-12 col-md-8 py-3">
                <div class="row px-2">
                    <b-button
                        class="mx-2 shadow"
                        size="md"
                        :variant="
                            select === 'recommended' ? 'netlify' : 'white'
                        "
                        @click="select = 'recommended';"
                    >
                        Recommended
                    </b-button>
                    <b-button
                        class="mx-2 shadow"
                        size="md"
                        :variant="select === 'popular' ? 'netlify' : 'white'"
                        @click="select = 'popular';"
                    >
                        Popular
                    </b-button>
                    <b-button
                        class="mx-2 shadow"
                        size="md"
                        :variant="select === 'latest' ? 'netlify' : 'white'"
                        @click="select = 'latest';"
                    >
                        Latest
                    </b-button>
                </div>
                <div class="row p-2">
                    <div
                        v-for="(item, index) in items"
                        :key="index"
                        class="col-12 p-2"
                    >
                        <book-item- :item="item" />
                    </div>
                </div>
            </div>
            <div class="main-right col-12 col-md-4" />
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
    data() {
        return {
            select: 'recommended',
        };
    },
    async asyncData() {
        return {
            items: (await axios.get('api/dev/mangas')).data,
        };
    },
};
</script>
<style lang="scss">
.main-right {
    background-color: rgba(black, 0.2);
}
</style>
