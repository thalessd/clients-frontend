<script setup lang="ts">
import HeaderForm from "@/components/HeaderForm.vue";
import type {ClientFormData} from "@/types/ClientFormData";
import {ClientsApi} from "@/services/ClientsApi";
import {AxiosError} from "axios";
import {onMounted, reactive} from "vue";
import ClientsTable from "@/components/ClientsTable.vue";
import type {Client} from "@/types/Client";

const initialFormData: ClientFormData = {
  name: "",
  email: "",
  cpf: "",
  phone: ""
}

type State = {
  clients: Client[]
  formIsOpen: boolean
  formData: ClientFormData
  clientSelectedId?: string
}

const state = reactive<State>({
  clients: [],
  formIsOpen: false,
  clientSelectedId: undefined,
  formData: initialFormData
})

onMounted(async () => {
  await populateClients()
})

async function handleSubmit(formData: ClientFormData) {
  const addNewClient = async () => {
    const newClient = await ClientsApi.create(formData)
    state.clients.unshift(newClient)
  }

  const updateClient = async () => {
    const clientId = state.clientSelectedId ?? ''
    const updatedClient = await ClientsApi.update(clientId, formData)

    const clientIndex = state.clients.findIndex((client) => client.id === clientId)
    state.clients.splice(clientIndex, 1, updatedClient)
  }

  try {
    state.clientSelectedId ? await updateClient() : await addNewClient()
    state.formIsOpen = false;
    state.formData = initialFormData;
  } catch (e) {
    if (e instanceof AxiosError) {
      return alert(e.response?.data.message.join(';\n'))
    }
    alert('unknown error :c')
  }
}


function handleCreateClick() {
  state.formIsOpen = true;
  state.clientSelectedId = undefined;
  state.formData = initialFormData;
}

function handleFormClose() {
  state.formIsOpen = false
  state.formData = initialFormData;
}

function handleUpdateClick(clientId: string) {
  const clientFound = state.clients.find((client: Client) => client.id === clientId)
  if (!clientFound) return;

  const {id, ...formData} = clientFound

  state.formIsOpen = true;
  state.clientSelectedId = id
  state.formData = formData
}

async function handleDeleteClick(clientId: string) {
  try {
    await ClientsApi.delete(clientId)

    const clientIndex = state.clients.findIndex((client) => client.id === clientId)
    state.clients.splice(clientIndex, 1)
  } catch (e) {
    alert('problem to delete client :c')
  }
}

async function populateClients() {
  try {
    state.clients = await ClientsApi.findAll()
  } catch (e) {
    alert('Problem to list clients')
  }
}
</script>

<template>
  <main class="container pb-5 pt-5">
    <div class="row flex-column align-items-center">
      <div class="col-12 col-md-8 col-lg-10">
        <HeaderForm @on-submit="handleSubmit"
                    v-if="state.formIsOpen"
                    :form-data="state.formData"
                    :is-update="!!state.clientSelectedId"
                    @on-close-click="handleFormClose"
                    @on-cancel-click="handleFormClose"/>
        <ClientsTable :clients="state.clients"
                      @on-add-click="handleCreateClick"
                      @on-edit-click="handleUpdateClick"
                      @on-remove-click="handleDeleteClick"
                      v-else/>
      </div>
    </div>
    <div class="w-100 d-flex flex-column mt-3">
      <h6 class="align-self-center text-white">By Thales Carvalho</h6>
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
