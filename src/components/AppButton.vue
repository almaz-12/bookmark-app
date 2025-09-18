<script setup lang="ts"></script>

<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-fg);
  cursor: pointer;
  border: 0;
  width: 158px;
  height: 50px;
  border-radius: 40px;
  font-size: 18px;
  letter-spacing: 2%;
  text-align: center;
  color: var(--color-bg);
}
.btn:hover {
  background: var(--color-fg-hover);
}
</style>
