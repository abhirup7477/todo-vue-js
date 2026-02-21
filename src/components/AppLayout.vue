<template>
  <el-container class="app-layout">
    
    <el-header class="app-header">
      <div class="header-content">
        Todo Application
      </div>
    </el-header>

    <el-main class="app-main">
      <div class="content-wrapper">
        <router-view />
      </div>
    </el-main>

  </el-container>
</template>

<style scoped>
/* Full page layout */
.app-layout {
  min-height: 100vh;
}

/* Header styling */
.app-header {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid #eaeaea;
  background: #fff;
}

/* Main area */
.app-main {
  display: flex;
  justify-content: center;   /* center horizontally */
  align-items: flex-start;   /* top align content */
  padding: 24px 12px;
  background: #f5f7fa;
}

/* Centered content container */
.content-wrapper {
  width: 100%;
  max-width: 700px;          /* required max width */
}
</style>