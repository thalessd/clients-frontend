<template>
  <Card>
    <h5>Registrar Cliente</h5>
    <hr>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3" >
        <label for="name" class="form-label">Nome</label>
        <input type="text" class="form-control" id="name" v-model="formData.name" placeholder="Seu nome">
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="text" class="form-control" id="email" v-model="formData.email" placeholder="my_email@example.com">
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Telefone</label>
        <input type="text" class="form-control" id="phone" v-model="formData.phone" v-maska="'(##) ##### ####'">
      </div>
      <div>
        <label for="cpf" class="form-label">CPF</label>
        <input type="text" class="form-control" id="cpf" v-model="formData.cpf" v-maska="'###.###.###-##'">
      </div>
      <input type="submit" value="Salvar Cliente" class="btn btn-primary mt-4" />
    </form>
  </Card>
</template>

<script setup lang="ts">
import {ref, onMounted, defineEmits} from 'vue'
import type {ClientFormData} from "@/types/ClientFormData";
import Card from "@/components/Card.vue";

const emit = defineEmits(['onSubmit'])

const formDefaultValue: ClientFormData = {
  name: '',
  email: '',
  phone: '',
  cpf: ''
}

const formData = ref<ClientFormData>(formDefaultValue)

onMounted(() => {
  formData.value = formDefaultValue
})

function handleSubmit() {
  emit('onSubmit', formData.value)
}

</script>