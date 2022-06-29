<script setup lang="ts">
import HeaderForm from "@/components/HeaderForm.vue";
import type {ClientFormData} from "@/types/ClientFormData";
import {ClientsApi} from "@/services/ClientsApi";
import {AxiosError} from "axios";
import {reactive} from "vue";
import ClientsTable from "@/components/ClientsTable.vue";

const state = reactive({
  clients: [], formIsOpen: false, clientSelected: undefined
})

async function handleSubmit(formData: ClientFormData) {
  try {
    const newClient = await ClientsApi.create(formData)
  } catch (e) {
    if (e instanceof AxiosError) {
      return alert(e.response?.data.message.join(';\n'))
    }

    alert('unknown error :c')
  }
}

</script>

<template>
  <main class="container pb-5 pt-5">
    <div class="row flex-column align-items-center">
      <div class="col-12 col-md-8 col-lg-5" v-if="state.formIsOpen">
        <HeaderForm @onSubmit="handleSubmit"/>
      </div>
      <div class="col-12 col-md-8 col-lg-5" v-else>
        <ClientsTable/>
      </div>
    </div>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600&display=swap');

html, body {
  font-family: Quicksand, sans-serif !important;
}

body {
  background: #4e54c8;
  background: -webkit-linear-gradient(to right, #8f94fb, #4e54c8);
  background: linear-gradient(to right, #8f94fb, #4e54c8);
}

</style>
