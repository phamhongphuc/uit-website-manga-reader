<template>
    <b-carousel id="carousel" :interval="7000" class="overflow-hidden carousel-fade shadow" controls indicators>
        <b-carousel-slide v-for="(content, index) in contents" :key="index">
            <img slot="img" :src="content.background" class="img-fluid w-100 d-block object-fit-cover" />

            <div slot="default" class="container pt-2 pb-5 h-100 d-flex">
                <div class="carousel-box position-relative h-100">
                    <img src="~/assets/img/box.png" class="h-100" style="opacity: 0.4" />
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
@each $breakpoint, $value in $map-breakpoints {
    @include media-breakpoint-only($breakpoint) {
        #carousel,
        .carousel-caption {
            min-height: #{200 + $value * 40}px;
            max-height: #{200 + $value * 40}px;
        }
        .carousel-item > img {
            height: #{200 + $value * 40}px;
        }
    }
}

.carousel-caption {
    @include make-container();
    @include make-container-max-widths();

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
        font-size: 1.5rem;
        font-weight: 900;
        color: $body-color;
    }
    .carousel-synopsis {
        color: $body-color;
        font-weight: 500;
        padding: 0;
        flex: 1;
        overflow: hidden;
    }
}
</style>
