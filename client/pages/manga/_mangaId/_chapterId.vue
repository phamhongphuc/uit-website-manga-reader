<template>
    <query-
        class="container"
        :query="getChapter"
        :variables="{
            id: currentChapterId,
        }"
    >
        <template slot-scope="{ data: { chapter } }">
            <div class="row py-3 flex-nowrap text-nowrap">
                <b-button class="m-2 shadow ml-auto" size="md" variant="white">
                    <span class="icon"></span>
                    <span>Previous</span>
                </b-button>
                <b-select
                    v-model="currentChapterId"
                    :options="chapter.manga.chapters"
                    value-field="id"
                    text-field="name"
                    class="shadow border-0 m-2"
                />
                <b-button class="m-2 shadow mr-auto" size="md" variant="white">
                    <span class="icon"></span>
                    <span>Next</span>
                </b-button>
            </div>
            <div class="image-view text-center">
                <image-
                    v-for="img in sortImage(chapter.images)"
                    :key="img.id"
                    :source="img.url"
                    alt=""
                />
            </div>
            <div class="row py-3 flex-nowrap text-nowrap">
                <b-button class="m-2 shadow ml-auto" size="md" variant="white">
                    <span class="icon"></span>
                    <span>Previous</span>
                </b-button>
                <b-select
                    v-model="currentChapterId"
                    :options="chapter.manga.chapters"
                    value-field="id"
                    text-field="name"
                    class="shadow border-0 m-2"
                />
                <b-button class="m-2 shadow mr-auto" size="md" variant="white">
                    <span class="icon"></span>
                    <span>Next</span>
                </b-button>
            </div>
        </template>
    </query->
</template>
<script>
import gql from 'graphql-tag';

export default {
    head() {
        return {
            title: 'Chapter Detail',
        };
    },
    data({ $route }) {
        return {
            currentChapterId: parseInt($route.params.chapterId),
            getChapter: gql`
                query getChapter($id: Int) {
                    chapter(id: $id) {
                        id
                        name
                        images {
                            id
                            url
                            name
                            width
                            height
                        }
                        manga {
                            id
                            chapters {
                                id
                                name
                            }
                        }
                    }
                }
            `,
        };
    },
    watch: {
        currentChapterId(value) {
            this.$router.push(`/manga/${this.$route.params.mangaId}/${value}`);
        },
    },
    methods: {
        sortImage(images) {
            return images.slice().sort((a, b) => a.name.localeCompare(b.name));
        },
    },
};
</script>
<style lang="scss">
.image-view {
    img {
        max-width: 100%;
        margin: auto;
    }
}
</style>
