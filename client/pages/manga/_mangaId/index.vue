<template>
    <query-
        :query="getManga"
        :variables="{
            id: parseInt($route.params.mangaId),
        }"
        :poll-interval="0"
        class="container"
    >
        <template slot-scope="{ data: { manga } }">
            <div class="row">
                <div class="col-4 col-md-3 col-lg-3 px-0">
                    <ratio-box- :dx="850" :dy="1200" class="mt-4">
                        <image-
                            :source="manga.image.url"
                            class="w-100 h-100 object-fit-cover shadow rounded overflow-hidden"
                        />
                    </ratio-box->
                    <div class="d-flex mb-3">
                        <b-button variant="main" class="mt-3 flex-fill">
                            Add to list
                        </b-button>
                        <b-button variant="red" class="mt-3 ml-2">
                            <span class="icon"></span>
                        </b-button>
                    </div>
                    <div class="p-3 shadow bg-white rounded">
                        <div class="text-bold">Associated Names</div>
                        <div class="mb-3">
                            {{ manga.associatedNames.join(', ') }}
                        </div>

                        <div class="text-bold">Format</div>
                        <div class="mb-3 text-capitalize">
                            {{ manga.type.toLowerCase() }}
                        </div>

                        <div class="text-bold">Status</div>
                        <div class="mb-3 text-capitalize">
                            {{ manga.status.toLowerCase() }}
                        </div>

                        <div class="text-bold">Author</div>
                        <div class="mb-3">{{ manga.authors }}</div>

                        <div class="text-bold">Published From</div>
                        <div class="mb-3">{{ manga.publishedFrom }}</div>

                        <div class="text-bold">Published To</div>
                        <div>{{ manga.publishedTo }}</div>
                    </div>
                </div>
                <div class="col">
                    <div class="book-page-top py-4 px-3 position-relative mb-5">
                        <h3 class="text-bold">{{ manga.name }}</h3>
                        <div class="book-page-tags nmx-2 mb-2">
                            <nuxt-link
                                v-for="(genre, index) in manga.genres"
                                :key="index * 2"
                                to="/"
                            >
                                {{ genre.name }}
                            </nuxt-link>
                        </div>
                        <div>{{ manga.description }}</div>
                    </div>
                    <div class="d-flex mx-3 mb-3">
                        <b-form-radio-group
                            v-model="currentTab"
                            buttons
                            button-variant="main"
                            :options="['Chapters', 'Reviews']"
                            name="radioBtnStacked"
                        />
                    </div>
                    <div
                        v-if="currentTab == 'Chapters'"
                        class="mx-3 shadow bg-white rounded"
                    >
                        <template
                            v-for="(chapter, index) in sortChapters(
                                manga.chapters,
                            )"
                        >
                            <b-hr- v-if="index !== 0" :key="index * 2 + 1" />
                            <nuxt-link
                                :key="index * 2"
                                :to="`/manga/${manga.id}/${chapter.id}`"
                                class="d-block p-3 chapter-item"
                            >
                                {{ chapter.name }}
                            </nuxt-link>
                        </template>
                    </div>
                    <div v-if="currentTab == 'Reviews'" class="mx-3">
                        <div class="d-flex mb-3">
                            <div>
                                <image-
                                    class="rounded-circle shadow mb-1"
                                    source="https://cdn.myanimelist.net/images/userimages/thumbs/7409496_thumb.webp"
                                />
                                <div class="icon vote-button"></div>
                                <div class="vote-number">28</div>
                                <div class="icon vote-button"></div>
                            </div>
                            <div
                                class="bg-white shadow rounded ml-3 flex-fill review"
                            >
                                <div class="d-flex align-items-center">
                                    <div class="text-bold px-3 py-2">
                                        User name
                                    </div>
                                    <div class="my-2 py-1 px-2 rounded spoiler">
                                        SPOILER
                                    </div>
                                </div>
                                <div class="hr" />
                                <div class="px-3 py-2">
                                    <div class="pre-line">{{ review }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mb-3">
                            <div>
                                <image-
                                    class="rounded-circle shadow mb-1"
                                    source="https://cdn.myanimelist.net/images/userimages/thumbs/7409496_thumb.webp"
                                />
                                <div class="icon vote-button"></div>
                                <div class="vote-number">15</div>
                                <div class="icon vote-button"></div>
                            </div>
                            <div
                                class="bg-white shadow rounded ml-3 flex-fill review"
                            >
                                <div class="d-flex align-items-center">
                                    <div class="text-bold px-3 py-2">
                                        User name
                                    </div>
                                </div>
                                <div class="hr" />
                                <div class="px-3 py-2">{{ review }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </query->
</template>
<script>
import { getManga } from '~/query/manga';

const review = `Kurenai is the 08 spring anime I had the highest hopes for, and I surely wasn't let down by it.
The artwork in the series is amazing. The main reason for this is the coloring - it's so vivid! It's sharp and varied colors, something which - as of what I've experienced - is unprecedented. The detail may skimp a bit now and then - which drags it down to a 9 (yes, I wanted to give it a 10). Oh, and the OP theme animations is pretty whacky - which is both good and bad.
The characters are as colorful as the animation is, even the minor characters. I really liked that, because it makes it oh so more realistic. And it's not only the characters as individuals, but also their relationships which I really loved. That does cover well up for the lack of character development that a 12-episode series is pretty much doomed to have.
The story in itself is very good too. It starts out very slice of life-ish, going with an episode-by-episode format, where Murasaki learns how the real world looks - after all, she's just escaped from being locked into a house with the most woman-discriminating family I've ever heard about, both in fiction and real life. But that being said, the episodes were great, because so much seemed to happen - often they featured parallel stories with Murasaki and someone else (often Shinkurou's two female neighbors) in one, and Shinkurou in another one. Halfway into the series, and a few episodes more, the series takes a drastic turn, and the more dramatic sides of the show starts to unfold, in contrast to the often light and comedic moments of the earlier episodes. It all culminates into two-three episodes with much action and drama, and an end which you're either gonna love or hate - I can't say more without spoiling anything.
The soundtrack is jazzy, and fits right into the scenes and the mood. Personally, I liked it, but it wasn't anything spectacular, and if you don't like the jazzy type of soundtrack, you can find comfort in the fact that you often don't notice it at all.
I really enjoyed this series, both because of its mix of many genres, special animation and wonderful characters, but also because of the calmness this anime presented. Even during the most intense scenes - either emotional or action-packed - I found it to be very calm. Personally, I think that gave the series that little extra which made me love it so much.
To 'Not Helpful' voters (and you 'Helpful' voters too): Feedback greatly appreciated =)
`;

export default {
    head() {
        return {
            title: 'Manga Detail',
        };
    },
    data() {
        return {
            getManga,
            currentTab: 'Chapters',
            review,
        };
    },
    methods: {
        sortChapters: chapters =>
            chapters
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .reverse(),
    },
};
</script>
<style lang="scss">
.book-page-cover-background {
    background: red;
    height: 300px;
}

.book-page-tags {
    > a {
        background-color: $main;
        color: white;
        padding: 0.25rem 1rem;
        border-radius: 2.5rem;
        margin: 0.25rem;
        display: inline-block;
        font-size: 0.9em;
        transition: 0.2s all;
        &:hover {
            text-decoration: none;
            background-color: darken($main, 10%);
        }
    }
}

.book-page-header {
    background: #fafafa;
    .book-page-header-cover {
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }

    .book-item-tags {
        > * {
            display: inline-block;
        }
    }
}

.book-page-top::after {
    content: '';
    z-index: -1;
    background: #fafafa;
    position: absolute;
    left: -100%;
    right: -100%;
    bottom: 0;
    top: 0;
    box-shadow: $box-shadow-sm;
}

.chapter-item {
    &:first-child {
        border-radius: $border-radius $border-radius 0 0;
    }
    &:last-child {
        border-radius: 0 0 $border-radius $border-radius;
    }
    &:hover {
        text-decoration: none;
        background: rgba($black, 0.075);
    }
    &:link {
        color: $main;
        font-style: italic;
    }
}

.review {
    position: relative;
    height: 250px;
    overflow: hidden;
    &::after {
        content: 'read more';
        font-style: italic;
        font-weight: 500;
        color: rgba($main, 1);
        position: absolute;
        background: rgb(255, 255, 255);
        background: linear-gradient(
            0deg,
            rgba(white, 1) 10%,
            rgba(white, 0) 100%
        );
        line-height: 150px;
        text-align: center;
        bottom: -2px;
        height: 100px;
        left: 0;
        right: 0;
    }
}

.vote-button {
    text-align: center;
    font-size: 1.75rem;
    cursor: pointer;
    &:hover {
        color: $main;
    }
}
.vote-number {
    cursor: default;
    text-align: center;
    font-size: 1.5rem;
    margin: -0.5rem 0;
}

.spoiler {
    background: $red;
    color: $white;
    font-size: 0.75em;
}
</style>
