<template>
    <b-carousel id="carousel" :interval="7000" class="overflow-hidden carousel-fade shadow" indicators>
        <b-carousel-slide v-for="(content, index) in contents" :key="index">
            <img slot="img" :src="content.background" class="img-fluid d-block object-fit-cover carousel-background" />

            <div slot="default" class="container pt-2 pb-6 h-100 d-flex">
                <div class="carousel-box position-relative h-100">
                    <img src="~/assets/img/box.png" class="h-100 carousel-box-image" />
                    <div class="px-5 py-4 h-100 position-absolute overflow-hidden flex-column d-flex t-0">
                        <div class="carousel-title">{{ content.title }}</div>
                        <div class="carousel-synopsis"><line-clamp- :content="content.synopsis"></line-clamp-></div>
                    </div>
                </div>
            </div>
        </b-carousel-slide>
    </b-carousel>
</template>
<script>
import lineClamp from '~/components/utilities/line-clamp.vue';

export default {
    components: {
        'line-clamp-': lineClamp,
    },
    data() {
        return {
            contents: [
                {
                    background: 'https://i.imgur.com/UqHq28l.jpg',
                    cover: 'https://i.imgur.com/iHq3VeQ.jpg',
                    title: 'Kimi no nawa',
                    synopsis: `Your Name (Japanese: 君の名は。) is a Japanese novel written by Makoto Shinkai. It is a novelization of the animated film of the same name, which was directed by Shinkai. It was published in Japan by Kadokawa on June 18, 2016, a month prior to the film premiere.`,
                },
            ],
        };
    },
};
</script>
<style lang="scss">
.carousel-box-image {
    opacity: 0.4;
}

.carousel-background {
    width: 100%;
}

.carousel-caption {
    @include make-container();
    @include make-container-max-widths();

    color: $body-color;
    text-align: left;
    bottom: 0;
    top: 0;
}

.carousel-box {
    position: absolute;
    overflow: hidden;
    margin-right: calc(#{$grid-gutter-width / -2} - 1rem);
    margin-left: calc(#{$grid-gutter-width / -2} - 1rem);

    .carousel-title {
        font-size: $h4-font-size;
        font-weight: 900;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .carousel-synopsis {
        font-weight: 500;
        overflow: hidden;
    }
}

@include media-breakpoint-only(xs) {
    .carousel-caption {
        background-color: rgba(white, 0.5);
        // background-image: linear-gradient(to bottom, $body-color 0%, transparent 50%);
    }

    .carousel-box {
        width: 100%;
    }

    .carousel-box-image {
        opacity: 0;
    }
}

@each $breakpoint, $lines in (xs: 5, sm: 4, md: 5, lg: 5, xl: 6) {
    $rem-height: map-get($spacers, 2) +
        map-get($spacers, 6) +
        map-get($spacers, 4) *
        2 +
        $h4-font-size *
        $line-height-base +
        $font-size-base *
        $line-height-base *
        $lines;
    @include media-breakpoint-only($breakpoint) {
        #carousel,
        .carousel-caption,
        .carousel-item > img {
            height: calc(20px * 2 + #{$rem-height});
        }
    }
}
</style>
