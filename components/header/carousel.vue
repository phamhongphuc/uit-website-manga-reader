<template>
    <b-carousel
        id="carousel"
        ref="123"
        :interval="7000"
        class="overflow-hidden carousel-fade"
        controls
        indicators
    >
        <b-carousel-slide
            v-for="i in 2"
            :key="i"
            :img-src="`/img/carousel/${i}.jpg`"
        />
    </b-carousel>
</template>
<script>
export default {};
</script>
<style lang="scss">
#carousel {
    @each $breakpoint, $value in $map-breakpoints {
        @include media-breakpoint-only($breakpoint) {
            max-height: #{200 + $value * 40}px;
        }
    }
}
</style>
