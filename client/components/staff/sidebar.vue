<template>
    <b-navbar id="sidebar">
        <b-navbar-nav>
            <!-- <b-nav-item-icon- to="/staff" icon="" text="Bảng điều khiển" /> -->
            <b-nav-item-icon-
                to="/staff/manga"
                icon=""
                text="Uploaded Manga"
            />
            <b-nav-item-icon-
                to="/staff/group"
                icon=""
                text="Scanlation Groups"
            />
            <b-nav-item-icon- to="/staff/help" icon="" text="Tutorial" />
        </b-navbar-nav>
    </b-navbar>
</template>
<script>
export default {
    components: {
        ...'~/components/bootstrap/b-nav-item-icon.vue',
    },
};
</script>

<style lang="scss">
#sidebar {
    flex-direction: column;
    justify-content: flex-start;
    padding: 1rem 1rem 0 0;
    background-color: #fff;
    box-shadow: $box-shadow-sm-right;

    .nav-item-icon {
        > .nav-link {
            padding-right: 1.5rem;
            padding-left: 0.5rem;
            border-radius: 0 1.25rem 1.25rem 0;
            font-weight: 600;
            transition: all 0.25s;
            &:hover {
                color: $main;
            }
            &.active {
                background: $main;
                color: $white;
            }
        }
        .icon {
            font-size: 1.25rem;
        }
    }
}
</style>
