<script setup>
import { ref } from "vue";
const { $axios } = useNuxtApp();

const mailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// form controls
const formRef = ref(null);
const formValid = ref(false);

// form Data
const name = ref(null);
const email = ref(null);

// notify
const showSnackbar = ref(false);
const snackbarTimeout = ref(3000);
let notifyText = ref("");

const loading = ref(false);

const formSubmit = async () => {
  const formData = { username: name.value, email: email.value };
  loading.value = true;

  try {
    const { data } = await $axios.post("/auth/register", formData);
    notifyText.value = data;

    showSnackbar.value = true;
    formRef.value.reset();
  } catch (error) {
    if (error.response) {
      notifyText.value = error.response.data;
      showSnackbar.value = true;
    } else {
      snackbarTimeout.value = 15000;

      notifyText.value = `If you see this message, check your network. 
        <br>
        if you're ok then please text me in
        <a class="text-blue-300 dark:text-blue-800" href='mailto: mohmmd@skiff.com'> mohmmd@skiff.com </a>
        <br>
        it has to be checked :))`;

      showSnackbar.value = true;
      setTimeout(() => {
        snackbarTimeout.value = 3000;
      }, 15000);
    }
  }
  loading.value = false;
};
</script>
<template>
  <div class="p-t-50 p-b-60">
    <p class="m1-txt1 p-b-36">
      <span class="m1-txt2">FEZtool</span> is Coming. For more information
      follow us now! ;)
    </p>

    <v-form ref="formRef" v-model="formValid">
      <v-text-field
        v-model="name"
        class="mb-2"
        :rules="[(v) => !!v || 'Name is required']"
        clearable
        label="Your Name"
        variant="outlined"
        density="compact"
      ></v-text-field>
      <v-text-field
        v-model="email"
        class="mb-2"
        :rules="[
          (v) => !!v || 'Email is required',
          (v) => mailPattern.test(v) || 'Email is incurrect',
        ]"
        clearable
        label="Email Address"
        variant="outlined"
        density="compact"
      ></v-text-field>

      <v-btn
        :disabled="!formValid"
        color="pink-accent-2"
        size="large"
        block
        @click="formSubmit"
        :loading="loading"
      >
        Subscribe
      </v-btn>
    </v-form>

    <p class="s2-txt3 p-t-18">
      And don’t worry, we hate spam too! You can unsubcribe at anytime.
    </p>

    <v-snackbar
      v-model="showSnackbar"
      location="bottom left"
      class="mb-5 ml-5"
      :timeout="snackbarTimeout"
    >
      <span v-html="notifyText"></span>
      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="showSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
