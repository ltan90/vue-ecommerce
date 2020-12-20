<template>
  <transition name="fade" v-if="showingAlertSuccess">
    <div class="alert alert-success" role="alert">
      <span>{{ alertHeading }}</span>
      <button type="button" class="close" @click="$emit('alertClose')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AlertSuccess',
  computed: {
    showingAlertSuccess () {
      return this.cond
    }
  },
  props: ['cond', 'alertHeading']
}
</script>

<style scoped>

</style>
