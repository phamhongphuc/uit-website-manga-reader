<template>
    <div>
        <div class="row-like staff-manga-list p-2">
            <div class="row">
                <div class="col-3 col-lg-3 col-xl-3 d-flex flex-column">
                    <div class="px-2 pb-1 mt-3">Cover</div>
                    <div class="bg-white p-3 rounded shadow flex-fill d-flex">
                        <div class="p-3 border-drop d-flex">
                            <div class="m-auto text-center">
                                <span class="icon mr-1"></span>
                                Drop images here to upload!
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="px-2 pb-1 mt-3">Name</div>
                    <b-input
                        v-model="createManga.name"
                        type="text"
                        class="shadow border-0"
                    />
                    <div class="px-2 pb-1 mt-3">Associated name</div>
                    <b-input
                        v-model="createManga.associatedNames"
                        type="text"
                        class="shadow border-0"
                    />
                    <div class="px-2 pb-1 mt-3">Authors</div>
                    <b-input
                        v-model="createManga.authors"
                        type="text"
                        class="shadow border-0"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="px-2 pb-1 mt-3">Type</div>
                    <b-select
                        v-model="createManga.type"
                        :options="['Manga', 'Manhwa', 'Manhua', 'Comic']"
                        class="shadow border-0"
                    />
                </div>
                <div class="col-12 col-md-6">
                    <div class="px-2 pb-1 mt-3">Status</div>
                    <b-select
                        v-model="createManga.status"
                        :options="['Ongoing', 'Completed', 'Drop']"
                        class="shadow border-0"
                    />
                </div>
                <div class="col-12 col-md-6">
                    <div class="px-2 pb-1 mt-3">Published From</div>
                    <b-input
                        v-model="createManga.publishedFrom"
                        type="date"
                        class="border-0 shadow"
                    />
                </div>
                <div class="col-12 col-md-6">
                    <div class="px-2 pb-1 mt-3">Published To</div>
                    <b-input
                        v-model="createManga.publishedTo"
                        type="date"
                        class="border-0 shadow"
                    />
                </div>
            </div>
            <div class="px-2 pb-1 mt-3">Genres</div>
            <query- :query="getGenres" :poll-interval="0">
                <b-checkbox-group
                    v-model="createManga.genres"
                    slot-scope="{ data: { genres } }"
                    :options="genres"
                    button-variant="main"
                    value-field="name"
                    text-field="name"
                    buttons
                    size="sm"
                    class="border-0 text-nowrap flex-wrap genres nm-1"
                    type="date"
                />
            </query->
            <div class="px-2 pb-1 mt-3">Description</div>
            <div class="p-0 bg-white shadow rounded d-flex">
                <textarea
                    v-model="createManga.publishedTo"
                    rows="7"
                    type="text"
                    class="border-0 rounded p-2 flex-fill"
                />
            </div>
        </div>
        <div class="row">
            <b-button class="mx-2 my-3 shadow ml-auto" size="md" variant="main">
                <span class="icon mr-1"></span>
                <span>Done</span>
            </b-button>
        </div>
    </div>
</template>
<script>
import gql from 'graphql-tag';

export default {
    layout: 'staff',
    head() {
        return {
            title: 'Chapter Detail',
        };
    },
    data({ route }) {
        return {
            createManga: {
                name: '',
                associatedNames: '',
                type: 'Manga',
                status: 'Ongoing',
                publishedFrom: '',
                publishedTo: '',
                genres: '',
                authors: '',
                description: '',
            },
            getGenres: gql`
                query getGenres {
                    genres {
                        name
                        description
                    }
                }
            `,
        };
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
.genres {
    > label {
        margin: 0.25rem !important;
        border-radius: $border-radius !important;
        flex: 0 !important;
        &:first-child {
            margin-left: 0;
        }
    }
}
</style>
