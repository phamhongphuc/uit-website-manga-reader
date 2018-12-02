<template>
    <div class="comment">
        <div class="comment-top border-bottom">
            <image- :source="data.user.avatar" class="shadow" />
            <div class="comment-right">
                <nuxt-link class="user-name font-pacifico" to="/">
                    {{ data.user.name }}
                </nuxt-link>
                <nuxt-link :to="data.book.link" class="book-name">
                    {{ data.book.name }}
                </nuxt-link>
            </div>
        </div>
        <div v-line-clamp:24="7" class="comment-content p-3">
            {{ data.content }}
        </div>
        <div class="comment-background" />
    </div>
</template>
<script>
export default {
    components: {
        ...'~/components/utilities/image.vue',
    },
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
    position: relative;
    z-index: 1;
}
.comment-top {
    display: flex;
    > img {
        height: 2.5rem;
        width: 2.5rem;
        display: block;
        margin: 0.75rem;
        border-radius: 3rem;
    }
    > .comment-right {
        padding: 0.5rem 0.5rem 0;
        flex: 1;
        overflow: hidden;
        > * {
            display: block;
        }
        > .user-name {
            font-size: 1.25rem;
            line-height: 1.5rem;
            @include text-truncate;
        }
        > .book-name {
            font-weight: 600;
            color: $main;
            @include text-truncate;
        }
    }
}

.comment-background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    filter: drop-shadow($box-shadow);
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        clip-path: polygon(4rem 0, 100% 0, 100% 100%, 0 100%, 0 4rem);
        border-radius: $border-radius;
        background: white;
    }
}
</style>
