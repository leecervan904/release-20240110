<template>
  <div>
    <div style="height: 600px">
      <DefaultLayout>
        <template #sidebar>
          <LeftTree @search="handleSearch" />
        </template>
      </DefaultLayout>
    </div>
  </div>
</template>

<script setup>
import DefaultLayout from "./layouts";
import LeftTree from "./components/LeftTree";

const handleSearch = () => {
  console.log("trigger search event!!!!!!");
};
</script>
