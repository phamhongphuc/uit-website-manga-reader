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
        ...'~/components/footer/footer.vue',
        ...'~/components/header/navbar.vue',
    },
};
</script>
