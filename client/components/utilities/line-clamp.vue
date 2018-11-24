<template>
    <div>{{ render }}</div>
</template>
<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';

export default {
    props: {
        content: {
            type: String,
            required: true,
        },
    },
    data() {
        return { render: '' };
    },
    mounted() {
        this.reload();
        /**
         * @type {HTMLElement}
         */
        const parent = this.$el.parentElement;
        window.addEventListener('resize', () => {
            this.reload();
        });
    },
    methods: {
        async reload() {
            this.render = this.content;
            await Vue.nextTick();
            const parent = this.$el.parentElement;
            let content = this.content;
            while (
                parent.clientHeight < parent.scrollHeight &&
                content.length > 0
            ) {
                await Vue.nextTick();
                content = content.substring(0, content.lastIndexOf(' '));
                this.render = content + '...';
            }
        },
    },
};
</script>
