<template>
  <div id="app">
    <header>
      <h1>tasks</h1>
      <p>a crummy little todo app</p>
    </header>
    <main>
      <section id="new">
        <new-task @add-task="addTask($event)"></new-task>
      </section>
      <task-list
        :tasks="this.tasks"
        @complete-task="completeTask($event)"
        @delete-task="deleteTask($event)"
      ></task-list>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Task from "@/Task";
import NewTask from "@/components/NewTask.vue";
import TaskList from "@/components/TaskList.vue";
import "@/app.sass";

@Component({
  components: {
    NewTask,
    TaskList,
  },
})
export default class App extends Vue {
  protected currentId = 1;
  protected tasks: Task[] = [];

  protected addTask(task: string) {
    this.tasks.push({
      id: this.currentId,
      title: task.trim(),
      completed: false,
    });
    this.currentId++;
  }

  protected completeTask(task: Task) {
    task.completed = !task.completed;
  }

  protected deleteTask(task: Task) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    this.tasks.splice(index, 1);
  }

  // @Watch('tasks')
  // protected onTaskChange() {
  //   console.log(this.tasks);
  // }
}
</script>
