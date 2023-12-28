<template>
  <h1>Profile</h1>
  <p>User id: {{ user.userId }}</p>
  <p>Username: {{ user.username }}</p>
  <form method="post" action="/api/logout" @submit.prevent="handleSubmit">
    <input type="submit" value="Sign out" />
  </form>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["protected"],
});

const user = await useAuthenticatedUser();

const handleSubmit = async (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return;
  await $fetch("/api/logout", {
    method: "POST",
    redirect: "manual", // ignore redirect responses
  });
  await navigateTo("/login");
};
</script>
