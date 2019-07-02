<template>
  <input
    autofocus
    type="text"
    placeholder="Something need doing?"
    v-model="task"
    @keyup.enter="addTask"
  />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class NewTask extends Vue {
  protected task = "";

  protected addTask() {
    this.$emit("add-task", this.task);
    this.task = "";
  }
}
</script>
