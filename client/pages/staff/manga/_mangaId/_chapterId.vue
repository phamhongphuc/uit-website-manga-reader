<template>
    <div>
        <div class="row">
            <b-button
                class="m-2 shadow"
                size="md"
                variant="white"
                exact
                :to="`/staff/manga/${$route.params.mangaId}`"
            >
                <span class="icon"></span>
                <span>Back</span>
            </b-button>
            <b-button class="m-2 ml-auto shadow" size="md" variant="danger">
                <span class="icon"></span>
                <span>Remove this draft</span>
            </b-button>
            <b-button
                class="m-2 shadow"
                size="md"
                variant="main"
                @click="updateChapter"
            >
                <span class="icon"></span>
                <span>Done</span>
            </b-button>
        </div>
        <div class="row-like staff-manga-list px-2">
            <div class="px-2 pb-1 mt-3">Name:</div>
            <div class="p-0 bg-white shadow rounded d-flex">
                <input
                    v-model="chapterEdit.name"
                    type="text"
                    class="border-0 rounded p-2 flex-fill"
                    placeholder="Enter chapter name here"
                />
            </div>
            <div class="px-2 pb-1 mt-3">Images:</div>
            <div class="bg-white shadow rounded">
                <div class="position-relative">
                    <div class="p-3">
                        <div
                            class="p-3 border-drop"
                            :class="{ 'border-drop-hover': isHover }"
                        >
                            <span class="icon mr-1"></span>
                            Drop images here to upload!
                        </div>
                    </div>
                    <input
                        ref="fileUpload"
                        accept="image/jpeg, image/png, image/gif"
                        type="file"
                        class="input-drop"
                        plain
                        multiple
                        @drop="isHover = false"
                        @dragexit="isHover = false"
                        @dragleave="isHover = false"
                        @dragenter="isHover = true"
                        @change="fileInputChange"
                    />
                </div>
                <b-table
                    class="table-style table-list-manga rounded border-top"
                    :items="images"
                    :fields="fields"
                >
                    <template slot="index" slot-scope="data">
                        {{ data.index }}
                    </template>
                    <template slot="action" slot-scope="data">
                        <div class="d-flex nm-1">
                            <b-button
                                variant="danger"
                                size="sm"
                                class="icon m-1"
                                @click="deleteImage(data)"
                            >
                                
                            </b-button>
                        </div>
                    </template>
                </b-table>
                <div v-if="images.length === 0" class="p-3">
                    <span>
                        There are no items to show in this list. Please press
                    </span>
                    <kbd>New chapter</kbd>
                    <span>to add one.</span>
                </div>
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
            title: 'Chapter Detail',
        };
    },
    async asyncData({ store, route }) {
        const { name } = await store.dispatch('chapter/fetchChapter', {
            chapterId: parseInt(route.params.chapterId),
        });
        return {
            chapterEdit: {
                name,
            },
        };
    },
    data({ route }) {
        return {
            isHover: false,
            files: [],
            fields: [
                {
                    key: 'index',
                    label: '#',
                    class: 'table-cell-id text-center',
                },
                {
                    key: 'name',
                    label: 'File Name',
                    tdClass: 'w-100',
                    sortable: true,
                },
                {
                    key: 'action',
                    label: '',
                },
            ],
        };
    },
    computed: {
        ...mapGetters({
            getChapter: 'chapter/getChapter',
            getImages: 'image/getImages',
        }),
        chapter() {
            return this.getChapter(parseInt(this.$route.params.chapterId));
        },
        images() {
            return this.getImages(parseInt(this.$route.params.chapterId));
        },
    },
    methods: {
        fileInputChange(event) {
            Array.from(event.target.files).forEach(file => {
                this.$store.dispatch('image/uploadImage', {
                    file,
                    chapterId: parseInt(this.$route.params.chapterId),
                });
            });
            event.target.value = '';
        },
        async updateChapter() {
            await this.$store.dispatch('chapter/updateChapter', {
                chapterId: parseInt(this.$route.params.chapterId),
                name: this.chapterEdit.name,
            });
            this.$router.push(`/staff/manga/${this.$route.params.mangaId}`);
        },

        async deleteImage(data) {
            await this.$store.dispatch('image/deleteImage', {
                imageId: data.item.id,
            });
        },
    },
};
</script>
<style lang="scss">
.col-form-label {
    padding-bottom: calc(0.125rem + 1px);
    padding-left: 0.125rem;
    font-weight: 500;
    font-size: 0.9em;
}

.border-drop {
    border: 3px $border-color dashed;
    transition: 0.2s all;
}
.border-drop-hover {
    border-color: rgba($main, 0.5);
    color: rgba($main, 0.5);
    transform: scale(1.1);
}

.input-drop {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    cursor: pointer;
}
</style>
