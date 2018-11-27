<script>
export default {
    props: {
        source: {
            type: String,
            required: true,
        },
        default: {
            type: String,
            default: '/img/circle.svg',
        },
        redirect: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isError: false,
            isLoad: false,
        };
    },
    methods: {
        onError() {
            this.isError = true;
        },
    },
    render(createElement) {
        const REDIRECT_API = process.env.REDIRECT_API;
        const source = this.redirect
            ? `${REDIRECT_API}/api/redirect/twitter/image/${this.source}`
            : this.source;
        return createElement('img', {
            attrs: {
                src: this.isError ? this.default : source,
            },
            class: {
                image: true,
                'd-none': !this.isLoad,
                'd-block': this.isLoad,
            },
            on: {
                error: this.onError,
                load: event => {
                    this.isLoad = true;
                },
            },
        });
    },
};
</script>
