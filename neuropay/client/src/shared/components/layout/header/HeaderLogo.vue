<template>
    <div class="logo-container">
        <img
            class="logo"
            src="@/assets/logo.png"
            alt="" />
        <div class="logo-text">Neuro Pay</div>
    </div>
</template>

<style scoped>
.logo-container {
    display: flex;
    align-items: center;
    gap: .5rem;
}

.logo-container, .logo {
    height: 100%;
}

.logo-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--p-primary-hover-color);
    white-space: nowrap;
}
</style>
