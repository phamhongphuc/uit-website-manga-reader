<template>
    <div>
        <div class="row">
            <b-button
                class="m-2 shadow"
                size="md"
                variant="white"
                to="/staff/manga"
                exact
            >
                <span class="icon"></span>
                <span>Back</span>
            </b-button>
            <b-button
                class="m-2 ml-auto shadow"
                size="md"
                variant="white"
                @click="newChapter"
            >
                <span class="icon"></span>
                <span>New Chapter</span>
            </b-button>
        </div>
        <div class="row-like staff-manga-list">
            <div class="mx-2 my-3 bg-white shadow rounded">
                <b-table
                    class="table-border-inside table-cell-middle"
                    :per-page="10"
                    :current-page="currentPage"
                    :items="chapters"
                    :fields="chaptersFields"
                >
                    <template slot="images" slot-scope="data">
                        {{ !data.value ? '' : data.value.length }}
                    </template>
                    <template slot="action" slot-scope="data">
                        <div class="d-flex nm-1">
                            <b-button
                                variant="main"
                                size="sm"
                                class="icon m-1"
                                :to="toEditChapter(data)"
                            >
                                
                            </b-button>
                            <b-button
                                variant="danger"
                                size="sm"
                                class="icon m-1"
                                @click="deleteChapter(data)"
                            >
                                
                            </b-button>
                        </div>
                    </template>
                </b-table>
                <div v-if="chapters.length === 0" class="p-3">
                    <span>
                        There are no items to show in this list. Please press
                    </span>
                    <kbd>New chapter</kbd>
                    <span>to add one.</span>
                </div>
            </div>
            <div class="d-flex">
                <b-pagination
                    v-model="currentPage"
                    first-text="<span class=&quot;icon&quot;></span>"
                    prev-text="<span class=&quot;icon&quot;></span>"
                    next-text="<span class=&quot;icon&quot;></span>"
                    last-text="<span class=&quot;icon&quot;></span>"
                    class="mx-2 ml-auto d-inline-flex shadow pagination-border-inside"
                    size="md"
                    :total-rows="chapters.length"
                    :per-page="10"
                />
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    layout: 'staff',
    head() {
        return {
            title: 'Manga Detail',
        };
    },
    async asyncData({ store, route }) {
        await store.dispatch('manga/fetchManga', {
            mangaId: parseInt(route.params.mangaId),
        });
        return {};
    },
    data() {
        return {
            currentPage: 0,
            chaptersFields: [
                {
                    key: 'id',
                    label: '#',
                    class: 'text-center table-cell-id',
                },
                {
                    key: 'name',
                    class: 'w-100',
                },
                {
                    key: 'images',
                    class: 'text-center',
                },
                {
                    key: 'action',
                },
            ],
        };
    },
    computed: {
        chapters() {
            return this.getChapters(parseInt(this.$route.params.mangaId));
        },
        ...mapGetters({
            getChapters: 'chapter/getChapters',
        }),
    },
    methods: {
        toEditChapter(data) {
            return `/staff/manga/${this.$route.params.mangaId}/${data.item.id}`;
        },
        async deleteChapter(data) {
            await this.$store.dispatch('chapter/deleteChapter', {
                chapterId: data.item.id,
                mangaId: parseInt(this.$route.params.mangaId),
            });
        },
        async newChapter() {
            await this.$store.dispatch('chapter/newChapter', {
                mangaId: parseInt(this.$route.params.mangaId),
                name: 'new chap',
            });
        },
    },
};
</script>
