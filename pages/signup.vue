<template>
  <h1>Sign up</h1>
  <form method="post" action="/api/signup" @submit.prevent="handleSubmit">
    <label>
      Username:
      <input type="text" name="username" />
    </label>
    <label>
      Password:
      <input type="password" name="password" />
    </label>
    <button type="submit">Sign up</button>
  </form>
  <NuxtLink to="/login">Sign in</NuxtLink>
</template>

<script lang="ts" setup>
const user = useUser();

if (user.value) {
  navigateTo("/");
}

async function handleSubmit(e: Event) {
  if (!(e.target instanceof HTMLFormElement)) return;

  const formData = new FormData(e.target);

  await $fetch("/api/signup", {
    method: "POST",
    body: {
      username: formData.get("username"),
      password: formData.get("password"),
    },
    redirect: "manual",
  });
  await navigateTo("/");
}
</script>
