<template>
    <footer class="footer-light mt-5 border-shadow-top">
        <div class="footer-block-light bg-white">
            <div class="container py-3">
                <div class="row">
                    <div class="col-12">
                        <div class="font-size-bigger font-pacifico">
                            Ai Scanlation
                        </div>
                        <div>
                            Scanlation will last as long as there are those
                            willing to do it.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-block-darker bottom border-top bg-white">
            <div class="container py-2 d-flex flex-wrap">
                <div class="d-inline-flex flex-wrap nml-2">
                    <a href="#">About</a>
                    <a href="#">Privacy</a>
                    <a href="#">Contact</a>
                    <a href="#">Feedback</a>
                </div>
                <div class="d-inline-flex flex-wrap ml-auto nmr-2">
                    <a href="#" class="text-hover-netlify icon ml-auto"></a>
                    <a href="#" class="text-hover-dribbble icon"></a>
                    <a href="#" class="text-hover-github icon"></a>
                    <a href="#" class="text-hover-facebook icon"></a>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
export default {};
</script>
<style lang="scss">
footer {
    .bottom {
        a {
            display: block;
            line-height: 2rem;
            font-size: 0.875em;
            margin: 0 map-get($spacers, 2);
            &.icon {
                font-size: 1.375em;
                transition: transform 0.7s, color 0.5s;
                &:hover {
                    transform: rotate(360deg);
                }
            }
        }
    }
}
</style>
