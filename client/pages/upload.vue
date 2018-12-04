<template>
    <div class="p-5 row">
        <b-form-file
            v-model="file"
            class="col-7 m-2"
            :state="Boolean(file)"
            placeholder="Choose a file..."
        />
        <b-button class="col-3 m-2" variant="netlify" @click="upload">
            Gửi lên nào
        </b-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            file: null,
        };
    },
    methods: {
        async upload() {
            const result = await this.$store.dispatch(
                'image/uploadImage',
                this.file,
            );
            // eslint-disable-next-line no-console
            console.log(result);
        },
    },
};
</script>
