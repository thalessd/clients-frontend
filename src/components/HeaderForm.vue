<template>
  <Card>
    <div class="d-flex flex-row w-100 justify-content-between align-items-center">
      <h5>{{ isUpdate ? 'Atualizar' : 'Registrar' }} Cliente</h5>
      <button class="btn" @click="$emit('onCloseClick')">
        <font-awesome-icon icon="fa-solid fa-close"/>
      </button>
    </div>
    <hr>
    <form @submit.prevent="$emit('onSubmit', formData)">
      <div class="mb-3">
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
      <div class="d-flex gap-2">
        <button type="submit" value="Salvar Cliente" class="btn btn-primary mt-4 mr-4">
          <span>Salvar Cliente </span>
          <font-awesome-icon icon="fa-solid fa-save"/>
        </button>
        <button class="btn btn-danger mt-4" @click="$emit('onCancelClick')">
          <span>Cancelar </span>
          <font-awesome-icon icon="fa-solid fa-x"/>
        </button>
      </div>
    </form>
  </Card>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'
import type {ClientFormData} from "@/types/ClientFormData";
import Card from "@/components/Card.vue";

defineProps<{
  formData: ClientFormData
  isUpdate: boolean
}>()

</script>