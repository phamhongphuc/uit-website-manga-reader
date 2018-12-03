<template>
    <div>
        <div class="row mb-2 justify-content-end">
            <b-button
                v-for="(set, index) in ['Recent comments', 'Top comments']"
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
            <div v-for="(item, index) in 2" :key="index" class="col-12 p-2">
                <comment- />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {
        ...'~/components/social/comment.vue',
    },
    data() {
        return {
            select: 'recommended',
        };
    },
};
</script>
