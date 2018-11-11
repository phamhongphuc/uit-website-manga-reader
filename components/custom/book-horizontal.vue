<template>
    <nuxt-link
        class="d-flex position-relative mt-3 mb-6 mr-3 book-horizontal"
        to="/"
    >
        <div class="position-absolute shadow shadow-back rounded bg-white mt-3 ml-3 h-100 t-0 col overflow-hidden p-2"/>
        <div class="col-8 col-xl-7 p-0 shadow overflow-hidden rounded img-container">
            <img
                :src="`${ROOT_API}/api/redirect/twitter/image/${item.img}`"
                class="d-block img-fluid w-100"
            >
        </div>

        <div class="col mt-4 overflow-hidden pl-3 pr-0">
            <p class="d-block m-0 text-dark text-nowrap overflow-hidden text-truncate text-bold">
                <span> {{ item.name }} </span>
            </p>
            <p class="d-block m-0 text-dark text-nowrap overflow-hidden text-truncate text-normal">
                <span> Chapter 96 </span>
            </p>
        </div>
    </nuxt-link>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            ROOT_API: process.env.ROOT_API,
        };
    },
};
</script>
<style lang="scss">
.book-horizontal {
    .shadow-back {
        @include transition-all;
    }

    &:hover {
        text-decoration: none;

        .shadow-back {
            box-shadow: 0 0.5rem 2.5rem rgba(0, 0, 0, 0.5) !important;
        }
    }
}
</style>
