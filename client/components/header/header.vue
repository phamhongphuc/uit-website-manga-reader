<template>
    <div id="header">
        <carousel- />
        <navbar- />
    </div>
</template>
<script>
import carousel from './carousel.vue';
import navbar from './navbar.vue';

export default {
    components: {
        'carousel-': carousel,
        'navbar-': navbar,
    },
};
</script>
