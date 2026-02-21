<template>
  <div class="page-wrapper" v-if="todo">
    <el-card class="todo-card">

      <!-- TITLE -->
      <h2 class="todo-title">
        {{ todo.title }}
      </h2>

      <!-- DESCRIPTION -->
      <div class="todo-description">
        {{ todo.description }}
      </div>

      <!-- STATUS -->
      <el-checkbox
        :model-value="todo.completed"
        @change="toggle"
      >
        Completed
      </el-checkbox>

      <!-- ACTIONS -->
      <div class="actions">
        <el-button type="primary" @click="back">
          Close
        </el-button>

        <el-button type="danger" @click="remove">
          Delete
        </el-button>
      </div>

    </el-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTodoStore } from '../store/todoStore'
import { ElMessageBox, ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const store = useTodoStore()

/* reactive lookup — important for Pinia */
const todo = computed(() =>
  store.getById(route.params.id)   // keep id as string
)

const toggle = () => {
  if (todo.value) {
    store.toggleTodo(todo.value.id)
  }
}

const back = () => router.push('/')

const remove = async () => {
  if (!todo.value) return

  try {
    await ElMessageBox.confirm(
      'This will permanently delete the todo. Continue?',
      'Warning',
      {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )

    store.removeById(todo.value.id)
    ElMessage.success('Todo deleted')
    router.push('/')

  } catch {
    ElMessage.info('Deletion cancelled')
  }
}
</script>

<style scoped>
/* center page content */
.page-wrapper {
  display: flex;
  justify-content: center;
  padding: 24px 12px;
}

/* card width constraint */
.todo-card {
  width: 100%;
  max-width: 700px;
}

/* prevent overflow from element-plus body */
:deep(.el-card__body) {
  overflow: hidden;
}

/* TITLE WRAPPING */
.todo-title {
  margin: 0 0 10px 0;
  line-height: 1.4;

  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
}

/* DESCRIPTION WRAPPING */
.todo-description {
  margin: 12px 0 16px 0;

  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
}

/* buttons layout */
.actions {
  margin-top: 16px;
  display: flex;
  gap: 12px;
}
</style>