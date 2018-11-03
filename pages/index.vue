<template>
    <section class="container">
        <img src="~assets/img/logo.png" 
             alt="Nuxt.js Logo" 
             class="logo" >
        <h1 class="title">
            USERS
        </h1>
        <ul class="users">
            <li v-for="(user, index) in users" 
                :key="index" 
                class="user">
                <nuxt-link :to="{ name: 'id', params: { id: index }}">
                    {{ user.name }}
                </nuxt-link>
            </li>
        </ul>
    </section>
</template>

<script>
import axios from '~/plugins/axios';

export default {
    async asyncData() {
        const { data } = await axios.get('/api/users');
        return { users: data };
    },
    head() {
        return {
            title: 'Home',
        };
    },
};
</script>
