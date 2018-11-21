<template>
    <div id="footer" class="mt-5">
        <div>
            <div class="container py-3">
                <div class="row">
                    <div class="col-24">
                        <div class="logo">Ai Scanlation</div>
                        <p class="mb-0">Scanlation will last as long as there are those willing to do it.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-black-3 bottom">
            <div class="container py-2 d-flex flex-wrap">
                <div class="d-inline-flex flex-wrap n-ml-2">
                    <a href="#">About</a>
                    <a href="#">Privacy</a>
                    <a href="#">Contact</a>
                    <a href="#">Feedback</a>
                </div>
                <div class="d-inline-flex flex-wrap ml-auto n-mr-2">
                    <a href="#" class="icon ml-auto"></a>
                    <a href="#" class="icon"></a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    mounted() {},
};
</script>
<style lang="scss">
#footer {
    background-color: $body-color;
    font-weight: lighter;

    div,
    p,
    a {
        color: map-get($theme-colors, semi-light);
    }
    .logo {
        font-family: 'Pacifico', cursive;
        font-size: 1.4em;
    }

    .bottom {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        a {
            display: block;
            line-height: 2rem;
            font-size: 0.875em;
            margin: 0 map-get($spacers, 2);
            &.icon {
                font-size: 1.375em;
            }
        }
    }
}
</style>
