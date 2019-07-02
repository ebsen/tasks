<template>
  <div id="app">
    <header>
      <h1>tasks</h1>
      <p>a really crummy todo app</p>
    </header>
    <main>
      <section id="new">
        <input
          autofocus
          type="text"
          placeholder="Something need doing?"
          v-model="newTask"
          @keyup.enter="addTask"
        />
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

@Component({
  components: {
    NewTask,
    TaskList,
  },
})
export default class App extends Vue {
  protected currentId = 1;
  protected newTask = "";
  protected tasks: Task[] = [];

  protected addTask() {
    this.tasks.push({
      id: this.currentId,
      title: this.newTask.trim(),
      completed: false,
    });
    this.currentId++;
    this.newTask = "";
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

<style lang="sass">
  #app
    max-width: 16em
    margin: 0 auto
  body
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  main
    border-top: 1px dotted grey
    padding: 1em 0
  header h1
    margin-bottom: 0
  li
    list-style-type: none
  ul
    padding-left: 0
  .completed
    label
      text-decoration: line-through
  .delete
    color: #E7040F
    font-weight: bold
    float: right
</style>
