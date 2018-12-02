<template>
    <b-nav-item class="nav-item-input">
        <div class="icon">{{ icon }}</div>
        <input
            type="text"
            :class="`pl-0 pr-3 pl-${reverseWhen}-3 pr-${reverseWhen}-0`"
            :placeholder="placeholder"
            :value="value"
            @input="$emit('input', $event.target.value)"
            @focus="$emit('update:focus', true)"
            @blur="$emit('update:focus', false)"
        />
    </b-nav-item>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: '',
        },
        focus: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
        reverseWhen: {
            type: String,
            default: '',
        },
    },
};
</script>
<style lang="scss">
.nav-item-input {
    background: rgba(black, 0.05);
    transition: border 0.2s;
    border-radius: 0.5 * $navbar-size;
    input {
        background: transparent;
        outline: none;
        height: $navbar-size;
        border: none;
        padding-top: 0;
        padding-bottom: 0;
        min-width: 0;
        flex-grow: 1;
    }
}
</style>
