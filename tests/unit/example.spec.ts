import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import NewTask from "@/components/NewTask.vue";
import TaskList from "@/components/TaskList.vue";

describe("App.vue", () => {
  it("exists", () => {
    const wrapper = shallowMount(App);
    expect(wrapper.exists()).to.equal(true);
  });
});

describe("NewTask.vue", () => {
  it("exists", () => {
    const wrapper = shallowMount(NewTask);
    expect(wrapper.exists()).to.equal(true);
  });
});

describe("TaskList.vue", () => {
  const tasks = [
    {
      id: 1,
      title: "Write a single working component",
      completed: false,
    },
    {
      id: 2,
      title: "Split that component into separate child components",
      completed: false,
    },
    {
      id: 3,
      title: "Write some tests",
      completed: false,
    },
  ];

  it("exists", () => {
    const wrapper = shallowMount(TaskList, { propsData: { tasks } });
    expect(wrapper.exists()).to.equal(true);
  });

  it("renders the correct number of initial tasks", () => {
    const wrapper = shallowMount(TaskList, { propsData: { tasks } });
    expect(wrapper.findAll("li").length).to.equal(3);
  });
});
