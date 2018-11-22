<template>
    <nuxt-link to="/" class="p-2 book-vertical">
        <div class="bg-white rounded shadow overflow-hidden d-flex flex-column h-100">
            <img
                :src="`${REDIRECT_API}/api/redirect/twitter/image/${item.img}`"
                class="d-block shadow-sm img-fluid w-100 flex-fill object-fit-cover mh-100"
            />
            <div class="p-3">
                <p class="d-block m-0 text-dark text-nowrap overflow-hidden text-truncate text-bold">
                    <span>{{ item.name }}</span>
                </p>
                <p class="m-0 text-black-50">Chapter: 69</p>
            </div>
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
            REDIRECT_API: process.env.REDIRECT_API,
        };
    },
};
</script>
<style lang="scss">
.book-vertical {
    img {
        transition: all 0.6s;
    }

    > * {
        transition: all 0.2s;
    }

    &:hover {
        text-decoration: none;

        > * {
            box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.5) !important;
        }

        img {
            max-height: 30% !important;
        }
    }

    &:active {
        > * {
            box-shadow: 0 0 2rem rgba(0, 0, 0, 0.5) !important;
        }
    }
}
</style>
