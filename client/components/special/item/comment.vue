<template>
    <div class="comment bg-white shadow rounded mb-3">
        <div class="d-flex p-3">
            <image-
                :source="data.user.avatar"
                width="44"
                height="44"
                class="rounded-circle mr-3"
            />
            <div>
                <nuxt-link
                    class="user-name font-pacifico d-block"
                    :to="data.book.link"
                >
                    {{ data.user.name }}
                </nuxt-link>
                <nuxt-link to="/" class="book-name d-block">
                    {{ data.book.name }}
                </nuxt-link>
            </div>
        </div>
        <b-hr- class="hr-1" />
        <div v-line-clamp:24="7" class="comment-content p-3">
            {{ data.content }}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Object,
            default: () => ({
                user: {
                    name: 'user name',
                    avatar: '/img/avatar.jpg',
                },
                book: {
                    name: 'manga name',
                    link: '/',
                },
                content: 'comment content',
            }),
        },
    },
};
</script>
<style lang="scss">
.comment {
    z-index: 1;
}
.book-name {
    max-height: 20px;
    font-size: 0.8em;
}
.comment-content {
    font-size: 0.8em;
}
</style>
