<template>
    <theme-toggle class="page-theme-toggle" />

    <main class="container">
        <div class="form-container">
            <header class="header">
                <img
                    class="logo"
                    src="@/assets/logo.png"
                    alt="" />
            </header>

            <slot />
        </div>
    </main>
</template>

<script lang="ts" setup>
import ThemeToggle from '@/shared/components/theming/ThemeToggle.vue';
</script>

<style scoped>
.page-theme-toggle {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
}

.container {
    min-height: 100vh;
    min-width: 100vw;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--p-primary-contrast-color);
}

.form-container {
    width: 100%;
    max-width: 400px;
    background-color: var(--p-content-background);
    border-radius: var(--p-content-border-radius);
    box-shadow: rgb(0 0 0 / 0.12) 0 12px 40px 0;
    padding: 55px 40px;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.header {
    text-align: center;
}

.logo {
    width: 100px;
    height: 100px;
}

@media (width <= 600px) {
    .container {
        align-items: flex-start;
        background-color: var(--p-content-background);
    }

    .form-container {
        max-width: 100%;
        box-shadow: none;
    }
}
</style>
