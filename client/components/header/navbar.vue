<template>
    <b-navbar
        id="navbar"
        toggleable="md"
        type="light"
        class="pb-0 py-md-0 px-md-2"
        sticky
    >
        <b-navbar-nav class="flex-row flex-grow-1 flex-md-grow-0 mb-2 mb-md-0">
            <b-navbar-toggle target="navbar-collapse" class="mx-1" />
            <b-nav-item
                class="font-pacifico font-size-bigger ml-md-2 mx-auto"
                to="/"
            >
                Ai Scanlation
            </b-nav-item>
            <b-nav-item-icon-
                class="d-md-none mx-1"
                to="/profile"
                image="/favicon.heart.pixel.png"
            />
        </b-navbar-nav>

        <b-collapse
            id="navbar-collapse"
            :class="{ 'navbar-input-focused': isInputFocus }"
            class="justify-content-end nmx-2 nmx-md-0 px-2 px-md-0"
            is-nav
        >
            <b-navbar-hr- class="d-md-none" />

            <b-navbar-nav class="py-2 flex-fill justify-content-end">
                <b-nav-item-input-
                    class="flex-fill"
                    reverse-when="md"
                    placeholder="Tìm kiếm"
                    icon=""
                    :focus.sync="isInputFocus"
                />
                <b-nav-item-icon-
                    to="/profile/saved-manga"
                    icon=""
                    text="Saved "
                    :class="isInputFocus ? 'w-0 h-0' : ''"
                />
                <b-nav-item-icon-
                    :class="isInputFocus ? 'w-0 h-0' : ''"
                    class="d-none d-md-block"
                    to="/profile"
                    image="/favicon.heart.pixel.png"
                    text="Thảo Trâm"
                    text-class="d-md-none"
                />
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import bNavItemIcon from '~/components/bootstrap/b-nav-item-icon.vue';
import bNavItemInput from '~/components/bootstrap/b-nav-item-input.vue';
import bNavbarHr from '~/components/bootstrap/b-navbar-hr.vue';

export default {
    components: {
        'b-nav-item-icon-': bNavItemIcon,
        'b-nav-item-input-': bNavItemInput,
        'b-navbar-hr-': bNavbarHr,
    },
    data() {
        return {
            isInputFocus: false,
        };
    },
    mounted() {},
    methods: {},
};
</script>
