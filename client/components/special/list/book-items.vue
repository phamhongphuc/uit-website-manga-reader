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
        <query- :query="getMangas" :poll-interval="0" class="row px-2">
            <template slot-scope="{ data: { mangas } }">
                <div
                    v-for="(item, index) in mangas"
                    :key="index"
                    class="col-12 p-2"
                >
                    <book-item- :item="item" />
                </div>
            </template>
        </query->
    </div>
</template>
<script>
import { getMangas } from '~/query/manga';

export default {
    data() {
        return {
            select: 'Recommended',
            getMangas,
        };
    },
};
</script>
