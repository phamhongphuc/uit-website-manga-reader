<template>
    <div id="footer" class="mt-5">
        <div class="bg-dark">
            <div class="container py-3">
                <div class="row">
                    <div class="col-24">
                        <div class="logo font-pacifico">Ai Scanlation</div>
                        <p class="mb-0">Scanlation will last as long as there are those willing to do it.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom bg-darker">
            <div class="container py-2 d-flex flex-wrap">
                <div class="d-inline-flex flex-wrap nml-2">
                    <a href="#">About</a>
                    <a href="#">Privacy</a>
                    <a href="#">Contact</a>
                    <a href="#">Feedback</a>
                </div>
                <div class="d-inline-flex flex-wrap ml-auto nmr-2">
                    <a href="#" class="dribbble icon ml-auto"></a>
                    <a href="#" class="facebook icon"></a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
#footer {
    font-weight: lighter;

    div,
    p,
    a {
        color: map-get($theme-colors, semi-light);
    }

    a:hover {
        text-decoration: none;
        color: white;
    }
    a.icon {
        transition: transform 0.7s, color 0.5s;
    }
    a.icon:hover {
        transform: rotate(360deg);
    }

    a.dribbble:hover {
        color: $dribbble-color;
    }

    a.facebook:hover {
        color: $facebook-color;
    }

    .logo {
        font-size: 1.4em;
    }

    .top-footer {
        filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.2));
        width: calc(100% + 10px);
        margin: 0 -5px -5px;
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
