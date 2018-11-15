<template>
    <div>
        <carousel- />
        <navbar- />
        <nuxt />
    </div>
</template>

<script>
import carousel from '~/components/header/carousel.vue';
import navbar from '~/components/header/navbar.vue';

export default {
    components: {
        'carousel-': carousel,
        'navbar-': navbar,
    },
};
</script>
