<template>
    <ratio-box- class="book-item" :dx="16" :dy="9" multi-child>
        <div class="right" />
        <div class="left">Image</div>
        <div class="right-text">Text</div>
    </ratio-box->
</template>
<script>
export default {
    components: {
        ...'~/components/utilities/ratio-box.vue',
    },
};
</script>
<style lang="scss">
.book-item {
    box-shadow: $box-shadow-sm;
    background: $white;

    $card-x: 16;
    $card-y: 9;

    $book-x: 5;
    $book-y: 7;

    $space: 1;
    $space-x: 1/16;
    $space-y: $space-x * $card-x / $card-y;

    $left-width: #{$book-x / $book-y * $card-y / $card-x * (1 - $space-y) * 100%};

    .left {
        bottom: $space / $card-y * 100%;
        background: red;
        width: $left-width;
    }
    .right {
        background: blue;
        top: $space / $card-y * 100%;
        left: $space / $card-x * 100%;
    }
    .right-text {
        top: $space / $card-y * 100%;
        left: $left-width;
    }
}
</style>
