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
        >
      </section>
      <section id="tasks">
        <ul>
          <li v-for="task in tasks" :class="{completed: task.completed}" :key="task.id">
            <input :id="task.id" name="done" type="checkbox" @click="completeTask(task)">
            <label>{{ task.title }}</label>
            <button class="delete" @click="deleteTask(task)">&times;</button>
          </li>
        </ul>
      </section>
      <!-- <footer>{{ this.tasks.filter(t => !t.completed).length }} tasks left</footer> -->
      <footer>{{ this.remainingTasks }}</footer>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NewTask from '@/components/NewTask.vue';
import Tasks from '@/components/Tasks.vue';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  components: {
    NewTask,
    Tasks,
  },
})
export default class App extends Vue {
  protected currentId = 1;
  protected newTask = '';
  protected tasks: Task[] = [];

  protected get remainingTasks() {
    const num = this.tasks.filter(t => !t.completed).length
    return `${num} task${num === 1 ? '' : 's'} left`
  }

  protected addTask() {
    this.tasks.push({
      id: this.currentId,
      title: this.newTask.trim(),
      completed: false,
    });
    this.currentId++;
    this.newTask = '';
  }

  protected completeTask(task: Task) {
    // task.completed = true;
    task.completed = !task.completed
  }

  protected deleteTask(task: Task) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    this.tasks.splice(index, 1);
  }
}
</script>

<style lang="sass">
  #app
    max-width: 16em
    margin: 0 auto
  body
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  main
    // border-bottom: 1px dotted grey
    border-top: 1px dotted grey
    padding: 1em 0
    // padding-bottom: 1em
  header h1
    margin-bottom: 0
  // main
  //   border-bottom: 1px solid grey
  //   border-top: 1px solid grey
  li
    // display: flex
    // justify-content: space-between
    list-style-type: none
    // button
    //   float: right
  ul
    padding-left: 0
  .completed
    // input::checked
    label
      text-decoration: line-through
  .delete
    color: red
    float: right
    // display: none
    // &:hover
  //   display: inline
</style>
