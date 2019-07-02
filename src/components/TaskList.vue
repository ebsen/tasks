<template>
  <article id="tasks">
    <ul>
      <li v-for="task in tasks" :class="{ completed: task.completed }" :key="task.id">
        <input :id="task.id" name="done" type="checkbox" @click="$emit('complete-task', task)" />
        <label>{{ task.title }}</label>
        <span class="delete" @click="$emit('delete-task', task)">&times;</span>
      </li>
    </ul>
    <footer>{{ this.remainingTasks }}</footer>
  </article>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Task from "@/Task";

@Component
export default class TaskList extends Vue {
  protected currentId = 1;
  @Prop() protected tasks!: Task[];

  protected get remainingTasks() {
    const num = this.tasks.filter(t => !t.completed).length;
    return `${num} task${num === 1 ? "" : "s"} left`;
  }
}
</script>
