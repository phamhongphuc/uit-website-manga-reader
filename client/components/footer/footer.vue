<template>
    <div id="footer" class="mt-5">
        <div class="container py-4">
            <div class="row">
                <div>
                    <div class="logo">Manga Scanlation</div>
                    <p class="mb-0">
                        This website is a project by
                        <u><a href="https://github.com/thaotram/">Thảo Trâm</a></u>
                    </p>
                </div>
                <div>
                    <div class="footer-link d-flex align-items-center ml-auto">
                        <a href="#" class="icon"></a>
                        <a href="#">About Us</a>
                        <a href="#">Privacy</a>
                    </div>
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

    div,
    p,
    a {
        color: rgba(white, 0.4);
    }

    .logo {
        font-family: 'Pacifico', cursive;
        font-size: 1.4em;
    }

    .icon {
        font-size: 1.4em;
    }

    .footer-link {
        > a {
            display: block;
            margin-left: 20px;
        }
    }
}

.manga-scanlation {
    margin-top: 10px;
    width: 400px;
}
</style>
