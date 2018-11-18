<template>
    <div>
        <navbar- />
        <carousel- />
        <nuxt />
        <footer- />
    </div>
</template>

<script>
import carousel from '~/components/header/carousel.vue';
import navbar from '~/components/header/navbar.vue';
import footer from '~/components/footer/footer.vue';

export default {
    components: {
        'carousel-': carousel,
        'navbar-': navbar,
        'footer-': footer,
    },
};
</script>
