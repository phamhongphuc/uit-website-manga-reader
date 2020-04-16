<template>
    <div>
        <div class="row mb-2 justify-content-end px-2">
            <b-button
                v-for="(set, index) in ['Recent comments']"
                :key="index"
                class="m-2 shadow"
                size="md"
                :variant="select === set ? 'main' : 'white'"
                @click="select = set"
            >
                {{ set }}
            </b-button>
        </div>
        <div class="row px-2 pt-2-5">
            <div v-for="(item, index) in 5" :key="index" class="col-12 px-2">
                <comment- />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            select: 'Recent comments',
        };
    },
};
</script>
<style lang="scss">
.pt-2-5 {
    padding-top: 0.75rem;
}
</style>
