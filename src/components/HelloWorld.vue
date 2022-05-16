<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
// import { getAddrs } from "@/api/Test";
import Test from "@/api/Test";

defineProps<{ msg: string }>();

const count = ref(0);
const state = reactive({
  data: {},
});
async function init() {
  // const data = await getAddrs({
  //   offset: 1,
  //   limit: 3,
  // });
  const data = await Test.getAddrs({
    offset: 1,
    limit: 3,
  });
  state.data = data;
  console.log(data);
}

onMounted(() => {
  init();
});
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
