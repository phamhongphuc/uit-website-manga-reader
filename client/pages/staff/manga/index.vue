<template>
    <div>
        <div class="row">
            <b-button class="m-2 ml-auto shadow" size="md" variant="white">
                <span class="icon"></span>
                <span>Filter</span>
            </b-button>
            <b-button
                class="m-2 shadow"
                size="md"
                variant="white"
                to="/staff/manga/create"
            >
                <span class="icon"></span>
                <span>New Manga</span>
            </b-button>
        </div>
        <div class="row-like staff-manga-list">
            <div class="mx-2 my-3 bg-white shadow rounded">
                <b-table
                    class="table-border-inside table-list-manga"
                    :per-page="2"
                    :current-page="currentPage"
                    :items="mangas"
                    :fields="fields"
                >
                    <template slot="image" slot-scope="data">
                        <img
                            :src="data.value.url"
                            class="d-block object-fit-cover shadow"
                            height="150"
                            width="100"
                        />
                    </template>
                    <template slot="name" slot-scope="data">
                        <div>
                            <div>
                                <span class="text-bold">Name:</span>
                                <nuxt-link to="/">{{ data.value }}</nuxt-link>
                            </div>
                            <div>
                                <span class="text-bold">Genres:</span>
                                <template
                                    v-for="(genre, index) in data.item.genres"
                                >
                                    <span
                                        v-if="index !== 0"
                                        :key="index * 2 + 1"
                                        class="d-inline-block"
                                    >
                                        ,
                                    </span>
                                    <nuxt-link
                                        :key="index * 2"
                                        to="/"
                                        class="d-inline-block"
                                    >
                                        {{ genre.name }}
                                    </nuxt-link>
                                </template>
                            </div>
                            <div>
                                <span class="text-bold">Latest chapter:</span>
                                This project doesn't have any chapter.
                            </div>
                            <div class="nmx-1">
                                <b-button
                                    variant="main"
                                    class="shadow m-1"
                                    :to="`/staff/manga/${data.item.id}`"
                                >
                                    <span class="icon"></span>
                                    <span>List Chapters</span>
                                </b-button>
                                <b-button
                                    variant="main"
                                    class="shadow m-1"
                                    :to="`/staff/manga/${data.item.id}/new`"
                                >
                                    <span class="icon"></span>
                                    <span>New Chapter</span>
                                </b-button>
                            </div>
                        </div>
                    </template>
                    <template slot="chapters" slot-scope="data">
                        <nuxt-link to="/">
                            {{ getChapterLength(data.item.id) }}
                        </nuxt-link>
                    </template>
                </b-table>
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
                    :total-rows="mangas.length"
                    :per-page="2"
                />
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';

export default {
    layout: 'staff',
    head() {
        return {
            title: 'Truyện đã đăng',
        };
    },
    async asyncData({ store }) {
        await store.dispatch('manga/fetchMangas');
        return {};
    },
    data() {
        return {
            currentPage: 0,
            fields: [
                {
                    key: 'image',
                    label: 'Cover',
                    sortable: false,
                },
                {
                    key: 'name',
                    label: 'Information',
                    tdClass: 'w-100',
                    sortable: true,
                },
                { key: 'chapters', sortable: true },
                { key: 'views', sortable: true },
            ],
        };
    },
    computed: {
        ...mapState({
            mangas: state => state.manga.mangas,
        }),
        ...mapGetters({
            getChapters: 'chapter/getChapters',
        }),
    },
    methods: {
        getChapterLength(mangaId) {
            const chapters = this.getChapters(mangaId);
            if (!chapters) return;
            return chapters.length >= 2
                ? chapters.length + ' chapters'
                : chapters.length + ' chapter';
        },
    },
};
</script>
