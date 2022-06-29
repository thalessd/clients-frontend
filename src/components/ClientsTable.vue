<template>
  <Card>
    <div class="d-flex flex-row w-100 justify-content-between align-items-center">
      <h5>Clientes</h5>
      <button class="btn btn-success" @click="$emit('onAddClick')">
        <span>Adicionar </span>
        <font-awesome-icon icon="fa-solid fa-add"/>
      </button>
    </div>
    <hr>
    <table class="table table-borderless" aria-describedby="Clients table">
      <thead>
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Email</th>
        <th scope="col">Telefone</th>
        <th scope="col">CPF</th>
        <th scope="col">Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="client in clients">
        <th scope="row">{{ client.name }}</th>
        <td>{{ client.email }}</td>
        <td>{{ client.phone }}</td>
        <td>{{ client.cpf }}</td>
        <td>
          <div class="d-flex flex-row gap-1">
            <button class="btn btn-sm btn-info" @click="$emit('onEditClick', client.id)">
              <font-awesome-icon icon="fa-solid fa-edit"/>
            </button>
            <button class="btn btn-sm btn-danger" @click="$emit('onRemoveClick', client.id)">
              <font-awesome-icon icon="fa-solid fa-trash"/>
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </Card>
</template>

<script setup lang="ts">
import Card from "@/components/Card.vue";
import type {Client} from "@/types/Client";

defineProps<{
  clients: Client[]
}>()


</script>