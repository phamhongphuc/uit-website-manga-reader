<template>
    <apollo-query
        :query="query"
        :variables="variables"
        :poll-interval="pollInterval"
        class="query"
    >
        <template slot-scope="{ result: { loading, error, data } }">
            <slot v-if="data" :data="data" />
            <div v-else class="query-text">
                <span v-if="loading">
                    <span class="icon mr-1"></span>
                    Đang tải dữ liệu...
                </span>
                <span v-else-if="error" class="text-red">
                    <span class="icon mr-1"></span>
                    Đã có lỗi xảy ra!
                </span>
                <span v-else>
                    <span class="icon mr-1"></span>
                    Đang yêu cầu dữ liệu...
                </span>
            </div>
        </template>
    </apollo-query>
</template>
<script>
export default {
    props: {
        query: {
            type: [String, Object],
            required: true,
        },
        variables: {
            type: Object,
            default: () => ({}),
        },
        pollInterval: {
            type: Number,
            default: 500,
        },
    },
};
</script>
<style lang="scss">
.query {
    > div > .query-text {
        display: flex;
        height: 100%;
        padding: 2rem;
        justify-content: center;
        align-items: center;
    }
}
</style>
