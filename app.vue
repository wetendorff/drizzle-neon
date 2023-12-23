<template>
  <form @submit.prevent="addUser">
    <label
      >Name:
      <input type="text" v-model="name" />
    </label>
    <button type="submit">Add</button>
  </form>
  <h2>List of users</h2>
  <ul>
    <li v-for="user in listOfUsers">{{ user.name }}</li>
  </ul>
</template>

<script setup>
const name = ref("");
const listOfUsers = ref([]);

await updateUserList();

async function addUser() {
  await $fetch("/api/users", { method: "POST", body: { name: name.value } });
  await updateUserList();
}

async function updateUserList() {
  const userList = await $fetch("/api/users");
  listOfUsers.value = userList;
}
</script>
