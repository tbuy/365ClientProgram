<template>
<div class="menu">
    <div class="left-menu">
        左边
    </div>
    <div class="right-menu">
        右边
    </div>
</div>
</template>

<script>
// Use Vuex
import store from './store'

export default {
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    }
  }
}
</script>

<style scope>
.menu {
    display: flex;
    width: 100%;
    background-color: pink;
}
.left-menu {
    width: 25%;
    background-color: red;
}
.right-menu {
    width: 75%;
    background-color: blue;
}
</style>
