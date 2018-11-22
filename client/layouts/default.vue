<template>
    <div>
        <navbar- />
        <nuxt />
        <footer- />
    </div>
</template>

<script>
export default {
    components: {
        'footer-': () => import('~/components/footer/footer.vue'),
        'navbar-': () => import('~/components/header/navbar.vue'),
    },
};
</script>
