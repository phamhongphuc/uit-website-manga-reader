<template>
    <b-navbar id="navbar" toggleable="md" type="dark" sticky class="p-2 px-md-3 w-100">
        <b-navbar-toggle target="header-collapse" />
        <b-navbar-brand class="mx-2" to="/">Manga Scanlation</b-navbar-brand>
        <!--
            <b-navbar-nav class="text-medium">
                <b-nav-item
                    to="/profile"
                    class="profile"
                >Thảo Trâm</b-nav-item>
            </b-navbar-nav>
        -->
        <b-navbar-nav class="search-bar ml-md-auto px-0 px-md-2 align-self-center">
            <input type="text" placeholder="Search" class="d-none d-md-block" />
            <b-nav-item class="icon"></b-nav-item>
        </b-navbar-nav>
        <b-collapse id="header-collapse" class="px-2 px-md-0" is-nav>
            <b-navbar-nav class="text-medium">
                <b-nav-item to="/profile" class="profile child-align-items-center">
                    <img
                        src="https://github.com/thaotram.png?size=40"
                        height="32"
                        width="32"
                        class="rounded-circle d-block"
                    />
                    <span class="d-block d-md-none ml-2">Thảo Trâm</span>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {};
</script>
<style lang="scss">
#navbar {
    background-color: $body-color;
    box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.4);

    .navbar-brand {
        font-family: 'Pacifico', cursive;
        font-size: 1.5em;
    }

    .navbar-toggler {
        height: 2.5rem;
        border: none !important;

        &:focus {
            outline: none;
        }

        > .navbar-toggler-icon {
            display: none;
        }

        &::after {
            @include icon;
        }
    }

    .nav-link {
        display: flex;
    }

    // Icon
    .navbar-toggler::after,
    .nav-item.icon > .nav-link {
        content: $navbar-toggler-icon;
        display: block;
        font-size: 1.25rem;
        line-height: $navbar-toggler-width;
        padding: 0;
        text-align: center;
        width: $navbar-toggler-width;
    }

    .search-bar {
        $search-line-size: 1px;

        input,
        li {
            border-width: $search-line-size 0;
            border-style: solid;
            border-color: transparent;
        }

        input,
        li > a {
            color: $navbar-dark-active-color;
        }

        li {
            @include transition-all;
        }

        input {
            @include transition-all;

            background-color: transparent;
            line-height: 2.5rem;
            padding: 0 0 0 0.75rem;

            &:focus {
                outline: none;

                &,
                & + li {
                    border-bottom-color: white;
                }
            }
        }
    }

    .profile {
        img {
            border: 2px solid;
        }
    }

    &.navbar-dark {
        .navbar-toggler {
            color: $navbar-dark-active-color;
        }
    }

    &.navbar-light {
        .navbar-toggler {
            color: $body-color;
        }
    }

    @include media-breakpoint-up(md) {
        .navbar-collapse {
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: auto;
        }

        .search-bar {
            > input,
            > li {
                border-color: transparent transparent $navbar-dark-color;
            }

            > input {
                &,
                & + li > a {
                    color: $navbar-dark-color;

                    &:hover {
                        color: $navbar-dark-hover-color;
                    }
                }

                &:focus {
                    &,
                    & + li > a {
                        color: $navbar-dark-active-color;
                    }
                }
            }
        }
    }
}
</style>
