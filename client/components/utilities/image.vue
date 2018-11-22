<script>
export default {
    props: {
        source: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isError: false,
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
                src: this.isError ? '/img/faq.svg' : this.source,
            },
            on: {
                error: this.onError,
            },
        });
    },
};
</script>
