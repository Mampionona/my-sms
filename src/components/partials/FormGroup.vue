<template>
  <div class="form-group">
    <div class="input-group input-group-merge input-group-alternative">
      <div class="input-group-prepend">
        <span class="input-group-text">
          <slot name="icon"></slot>
        </span>
      </div>
      <slot name="input"></slot>
    </div>
  </div>
</template>
