<template>
    <ratio-box- class="book-item" :dx="16" :dy="9">
        <div class="book-item-background" />
        <div class="book-item-image">
            <image- redirect :source="item.img" />
        </div>
        <div class="book-item-text">Text</div>
    </ratio-box->
</template>
<script>
export default {
    components: {
        ...'~/components/utilities/ratio-box.vue',
        ...'~/components/utilities/image.vue',
    },
    props: {
        item: {
            type: Object,
            default: () => ({
                title: 'hello',
                img: 'DrMpC5CXcAApzT7',
            }),
        },
    },
};
</script>
<style lang="scss">
.book-item {
    $card-w: 16;
    $card-h: 9;

    $wp: 1 / $card-w * 100%;
    $hp: 1 / $card-h * 100%;

    $space: 1;

    $image-r-w: 85; /* ratio */
    $image-r-h: 120; /* ratio */

    $image-h: $card-h - $space;
    $image-w: $image-h / $image-r-h * $image-r-w;

    $space-w: $space * $wp;
    $space-h: $space * $hp;

    > div {
        display: grid;
        grid-template-columns: $space-w #{($image-w - $space) * $wp} auto;
        grid-template-rows: $space-h auto $space-h;
    }

    .book-item-background {
        grid-column: 2 / 4;
        grid-row: 2 / 4;
        box-shadow: $box-shadow-sm;
        background: $white;
        border-radius: $border-radius;
    }
    .book-item-image {
        grid-column: 1 / 3;
        grid-row: 1 / 3;
        box-shadow: $box-shadow-sm;
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
    }
}
</style>
