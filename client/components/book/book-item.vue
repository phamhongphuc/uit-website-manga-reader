<template>
    <div class="book-item ratio-box">
        <div>
            <div class="book-item-background" />
            <div class="book-item-image">
                <image- redirect :source="item.img" />
            </div>
            <div class="book-item-text">
                <div class="book-item-title">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {
        ...'~/components/utilities/ratio-box.vue',
        ...'~/components/utilities/image.vue',
        ...'~/components/utilities/line-clamp.vue',
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>
<style lang="scss">
@mixin book-item-grid($box-w, $box-h, $space, $img-rw, $img-rh) {
    $image-r: $img-rw / $img-rh;

    $image-h: $box-h - $space;
    $image-w: $image-h * $image-r;

    $space-w: $space / $box-w * 100%;
    $space-h: $space / $box-h * 100%;

    padding-bottom: $box-h / $box-w * 100%;
    > div {
        grid-template-columns:
            $space-w
            #{($image-w - $space) / $box-w * 100%}
            auto;
        grid-template-rows: $space-h auto $space-h;
    }
}

@mixin book-item-grid-up($box-w, $box-h, $space, $img-rw, $img-rh, $up: null) {
    @include media-breakpoint-up($up) {
        @include book-item-grid($box-w, $box-h, $space, $img-rw, $img-rh);
    }
}

.book-item {
    // $box-w, $box-h, $space, $img-rw, $img-rh, $up
    @include book-item-grid(30, 12, 1, 85, 120);
    @include book-item-grid-up(30, 11, 1, 85, 120, lg);
    @include book-item-grid-up(30, 10, 1, 85, 120, xl);

    > div {
        display: grid;
    }

    .book-item-background {
        grid-column: 2 / 4;
        grid-row: 2 / 4;
        box-shadow: $box-shadow;
        background: $white;
        border-radius: $border-radius;
    }
    .book-item-image {
        grid-column: 1 / 3;
        grid-row: 1 / 3;
        box-shadow: $box-shadow;
        background: $white;
        border-radius: $border-radius;
        overflow: hidden;
        > img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
    .book-item-text {
        grid-column: 3 / 4;
        grid-row: 2 / 4;
        overflow: hidden;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        > .book-item-title {
            white-space: nowrap;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: bold;
            font-size: 1.25rem;
            height: 2rem;
        }
        > .book-item-description {
            flex: 1;
            overflow: hidden;
        }
    }
}
</style>
