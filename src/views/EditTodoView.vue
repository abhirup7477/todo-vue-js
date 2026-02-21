<template>
  <el-card>
    <h2>Edit Todo</h2>

    <el-form label-position="top">
      <el-form-item label="Title">
        <el-input v-model.trim="title" />
      </el-form-item>

      <el-form-item label="Description">
        <el-input v-model.trim="description" />
      </el-form-item>

      <el-button type="primary" @click="update">Update</el-button>
      <el-button @click="back">Cancel</el-button>
    </el-form>
  </el-card>
</template>

<script setup>
    import { ref, computed, watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useTodoStore } from '../store/todoStore'

    const route = useRoute()
    const router = useRouter()
    const store = useTodoStore()

    const todo = computed(() => store.getById(route.params.id))

    const title = ref(todo.value?.title || '')
    const description = ref(todo.value?.description || '')


    const update = () => {
        if (!title.value.trim()) return

        store.update({
            id: todo.value.id,
            title: title.value,
            description: description.value,
            completed: todo.value.completed   // keep previous state
    })

    router.push('/todo/' + route.params.id)
}

    const back = () => {
        router.push('/')
    }
</script>