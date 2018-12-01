<template>
    <div class="book-item ratio-box">
        <div>
            <div class="book-item-box" />
            <div class="book-item-image">
                <image- redirect :source="item.img" />
            </div>
            <div class="book-item-text">
                <div class="book-item-title">{{ item.name }}</div>
                <div class="book-item-tags">
                    <span v-for="(tag, index) in tags" :key="index">
                        {{ tag }}
                    </span>
                </div>
                <div
                    v-line-clamp="breakpointMap[breakpoint]"
                    class="book-item-description"
                >
                    {{ content }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    components: {
        ...'~/components/utilities/ratio-box.vue',
        ...'~/components/utilities/image.vue',
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            breakpointMap: {
                xs: 3,
                sm: 4,
                md: 4,
                lg: 4,
                xl: 4,
            },
            tags: ['Action', 'Yuri', 'Shoujo Ai'],
            content:
                'In the city of Ergastulum, a shady ville filled with made men and petty thieves, whores on the make and cops on the take, there are some deeds too dirty for even its jaded inhabitants to touch. Enter the “Handymen,” Nic and Worick, who take care of the jobs no one else will handle. Until the day when a cop they know on the force requests their help in taking down a new gang muscling in on the territory of a top Mafia family. It seems like business (and mayhem) as usual, but the Handymen are about to find that this job is a lot more than they bargained for.',
        };
    },
    computed: {
        ...mapState({
            breakpoint: state => state.style.breakpoint,
        }),
    },
};
</script>
<style lang="scss">
$img-rw: 852;
$img-rh: 1200;
$img-r: $img-rw / $img-rh;

$title-height: 2rem;
$description-line-height: 1.5rem;

@mixin book-item-grid() {
    $description-lines: 4;
    $spa-v: 0.75rem;
    $box-vh: $title-height + $description-line-height * $description-lines +
        $spa-v * 2.5 + 1.25rem + 0.5rem;

    $img-vh: $box-vh; /* Bằng chiều cao của box ở dưới */
    $img-vw: $img-vh * $img-r;

    $text-padding-top: $spa-v;
    $text-padding-bottom: $spa-v * 1.5;

    // Tạo ra tỉ lệ cho toàn bộ box ở ngoài (bao gồm cả box nền và img)
    height: $box-vh + $spa-v;
    > div {
        grid-template-columns:
            [left-img] $spa-v
            [left-box] #{$img-vw - $spa-v}
            [right-img] $spa-v * 1.5
            [left-text] auto
            [right-text] $spa-v * 1.5
            [right-box];
        grid-template-rows:
            [top-img] $spa-v
            [top-box] $text-padding-top
            [top-text] auto
            [bottom-text] #{$text-padding-bottom - $spa-v}
            [bottom-img] $spa-v
            [bottom-box];
    }
}

@mixin book-item-grid-up($box-rw, $box-rh, $spa, $img-rw, $img-rh, $up: null) {
    @include media-breakpoint-up($up) {
        @include book-item-grid($box-rw, $box-rh, $spa, $img-rw, $img-rh);
    }
}

.book-item {
    // $box-rw, $box-rh, $spa, $img-rw, $img-rh, $up
    @include book-item-grid();
    // @include book-item-grid-up(30, 11, 1, 85, 120, lg);
    // @include book-item-grid-up(30, 10, 1, 85, 120, xl);

    > div {
        display: grid;
    }

    .book-item-box {
        grid-column: left-box / right-box;
        grid-row: top-box / bottom-box;
        box-shadow: $box-shadow;
        background: $white;
        border-radius: $border-radius;
    }
    .book-item-image {
        grid-column: left-img / right-img;
        grid-row: top-img / bottom-img;
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
        &:hover {
            background: rgba(darkslategrey, 0.2);
        }

        grid-column: left-text / right-text;
        grid-row: top-text / bottom-text;
        overflow: hidden;
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
            line-height: $title-height;
        }
        > .book-item-tags {
            -webkit-overflow-scrolling: touch;
            display: flex;
            margin: 0.25rem -0.25rem;
            height: 1.25rem;
            > span {
                $span-height: 1.25rem;

                color: rgba($white, 0.75);
                background: rgba($black, 0.75);
                font-weight: 500;
                padding: 0 #{$span-height / 2};
                line-height: $span-height;
                height: $span-height;
                font-size: 0.75em;
                border-radius: 0.25rem;
                margin: 0 0.25rem;
                box-shadow: $box-shadow-sm;
            }
        }
        > .book-item-description {
            line-height: $description-line-height;
            height: $description-line-height * 4;
        }
    }
}
</style>
