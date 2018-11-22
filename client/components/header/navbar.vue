<template>
    <b-navbar
        id="navbar"
        toggleable="md"
        type="dark"
        class="bg-darker pb-0 py-md-0 px-md-2"
        :class="{ 'on-top': isScrollTop }"
        sticky
    >
        <b-navbar-toggle target="header-collapse" />
        <b-navbar-nav><b-nav-item class="font-pacifico logo ml-md-2" to="/">Ai Scanlation</b-nav-item></b-navbar-nav>

        <!--
            <b-navbar-nav class="search-bar ml-md-auto px-0 px-md-2 align-self-center d-md-none">
                <input type="text" placeholder="Search" class="d-none d-md-block" />
                <b-nav-item class="icon"></b-nav-item>
            </b-navbar-nav>
        -->
        <b-navbar-nav class="d-flex d-md-none">
            <b-nav-item to="/profile" class="icon">
                <div class="p-2">
                    <image-
                        source="https://github.com/thaotram.png?size=24"
                        height="24"
                        width="24"
                        class="rounded-circle d-block"
                    />
                </div>
            </b-nav-item>
        </b-navbar-nav>

        <div class="horizontal d-md-none"></div>

        <b-collapse
            id="header-collapse"
            is-nav
            class="nmx-2 nmx-md-0 p-0 justify-content-end"
            :class="{ 'input-focused': isInputFocus }"
        >
            <b-navbar-nav class="py-2 flex-fill justify-content-end">
                <b-nav-item class="search-bar flex-fill">
                    <div class="icon"></div>
                    <input
                        type="text"
                        placeholder="Search or jump to..."
                        class="flex-fill p-0 text-white border-0 mw-0"
                        @focus="isInputFocus = true;"
                        @blur="isInputFocus = false;"
                    />
                </b-nav-item>
                <b-nav-item to="/profile/saved-manga">
                    <div class="icon"></div>
                    <div class="d-md-none">Saved Manga</div>
                </b-nav-item>
                <b-nav-item to="/mangas">
                    <div class="icon"></div>
                    <div class="d-md-none">All Manga</div>
                </b-nav-item>
                <b-nav-item to="/genres">
                    <div class="icon"></div>
                    <div class="d-md-none">Genre</div>
                </b-nav-item>
                <b-nav-item to="/profile" class="d-none d-md-block">
                    <div class="icon">
                        <image-
                            source="https://github.com/thaotram.png?size=24"
                            height="24"
                            width="24"
                            class="rounded-circle d-block m-2"
                        />
                    </div>
                    <div class="d-md-none">Thảo Trâm</div>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import image from '~/components/utilities/image.vue';

export default {
    components: {
        'image-': image,
    },
    data() {
        return {
            isScrollTop: true,
            isInputFocus: false,
        };
    },
    mounted() {},
    methods: {},
};
</script>
<style lang="scss">
#navbar {
    .navbar-nav {
        line-height: 2.5rem;

        > li.nav-item > .nav-link {
            display: flex;
        }

        > li.logo {
            font-size: 1.2em;
            > a {
                color: white;
            }
        }
    }

    > .navbar-toggler {
        height: 2.5rem;
        border: none !important;

        &:focus {
            outline: none;
        }
        &::after {
            @include icon;
        }
        > .navbar-toggler-icon {
            display: none;
        }
    }

    > .horizontal {
        flex-basis: 100%;
        flex-grow: 1;
        height: 0.5rem;
    }

    // Icon
    .navbar-nav > .nav-item.icon > .nav-link,
    > .navbar-toggler::after,
    > .navbar-collapse > .navbar-nav > .nav-item > .nav-link > .icon {
        content: $navbar-toggler-icon;
        display: block;
        font-size: 1.25rem;
        line-height: $navbar-toggler-width;
        min-height: $navbar-toggler-width;
        padding: 0;
        text-align: center;
        width: $navbar-toggler-width;
        min-width: $navbar-toggler-width;
    }

    > #header-collapse {
        transition: all 0.2s;
        border-top: 1px solid rgba(white, 0.1);
        background-color: $dark;

        &.show,
        &.collapsing {
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
        }

        > .navbar-nav > .nav-item {
            height: 2.5rem;
            transition: all 0.2s;
            overflow: hidden;

            &.search-bar {
                border-bottom: 0 solid transparent;
                transition: border 0.2s;

                > .nav-link > input {
                    background: rgba(255, 255, 255, 0);
                    outline: none;
                    height: $navbar-toggler-width;
                }
            }

            .nav-link > .icon {
                margin-right: 0.25rem;
            }
        }

        @include media-breakpoint-up(md) {
            background-color: transparent;
            > .navbar-nav > .nav-item {
                width: 2.5rem;
                > .nav-link > .icon {
                    margin-right: 0;
                }
            }
            > .navbar-nav > .search-bar {
                max-width: 300px;
                > .nav-link {
                    > .icon {
                        order: 1;
                    }
                    > input {
                        text-align: right;
                    }
                }
            }
        }

        &.input-focused > .navbar-nav > .nav-item {
            &.search-bar {
                border-bottom-color: rgba(white, 0.1);
                border-bottom-width: 1px;
            }
            &:not(.search-bar):not(.search-result) {
                height: 0;
                width: 0;
            }
        }
    }
}
</style>
