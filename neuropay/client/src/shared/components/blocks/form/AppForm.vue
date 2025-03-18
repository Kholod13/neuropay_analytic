<template>
    <form
        @submit="handleSubmit"
        class="form"
        action=""
        novalidate>
        <slot />
    </form>
</template>

<script lang="ts" setup>
type Emits = {
    (event: 'submit'): void
}

const emit = defineEmits<Emits>();

function handleSubmit(event: Event) {
    event.preventDefault();
    emit('submit');
}
</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
}
</style>
