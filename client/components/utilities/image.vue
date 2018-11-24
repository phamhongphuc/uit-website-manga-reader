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
        return createElement('img', {
            attrs: {
                src: this.isError ? this.default : this.source,
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
