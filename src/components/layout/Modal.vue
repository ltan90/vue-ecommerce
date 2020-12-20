<template>
  <transition name="fade">
    <div class="modal-app" v-if="showingModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ modalHeading }}
            </h5>
            <button type="button" class="btn btn-warning btn-sm" @click="$emit('modalClose')">X</button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning btn-sm" @click="$emit('modalClose')">Close</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  computed: {
    showingModal () {
      return this.cond
    }
  },
  props: ['cond', 'modalHeading']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-app{
  position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
}
</style>
