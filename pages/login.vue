<template>
  <h1>Sign in</h1>
  <form
    method="post"
    action="/api/login"
    @submit.prevent="handleSubmit"
    enctype="multipart/form-data"
  >
    <label>
      Username:
      <input type="text" name="username" />
    </label>
    <label>
      Password:
      <input type="password" name="password" />
    </label>
    <button type="submit">Sign in</button>
  </form>
  <NuxtLink to="/signup">Sign up</NuxtLink>
</template>

<script lang="ts" setup>
const user = useUser();

if (user.value) {
  await navigateTo("/"); // redirect to profile page
}

const handleSubmit = async (e: Event) => {
  if (!(e.target instanceof HTMLFormElement)) return;
  const formData = new FormData(e.target);

  await $fetch("/api/login", {
    method: "POST",
    body: {
      username: formData.get("username"),
      password: formData.get("password"),
    },
    redirect: "manual",
  });
  await navigateTo("/");
};
</script>
