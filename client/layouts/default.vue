<template>
    <div>
        <nuxt />
        <footer- />
    </div>
</template>

<script>
import footer from '~/components/footer/footer.vue';

export default {
    components: {
        'footer-': footer,
    },
};
</script>
