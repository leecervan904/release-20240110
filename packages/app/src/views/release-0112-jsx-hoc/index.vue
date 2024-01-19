<template>
  <div>
    <Button type="primary" @click="visibleAdd = true">ModalFormAdd</Button>
    <Button type="primary" @click="visibleRename = true"
      >ModalFormRename</Button
    >

    <ModalFormAdd />
    <ModalFormRename />
  </div>
</template>

<script setup lang="jsx">
import { useModalFormAdd, useModalFormRename } from "./useModalFormAction.jsx";

const { visibleAdd, ModalFormAdd } = useModalFormAdd();
const { visibleRename, ModalFormRename } = useModalFormRename();
</script>
