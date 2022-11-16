<template>
    <input
    v-model="editionValue"
    @keyup.enter="saveEdition"
    @blur="saveEdition"
    @keydown.esc="discardEdition"
    ref="editInput"
    />
</template>

<script lang="ts">
/* eslint-disable max-len */
import {
  defineComponent,
  Ref,
  ref,
  onMounted,
} from 'vue';

export default defineComponent({
  emits: ['save-edition', 'discard-edition'],
  props: {
    initValue: String,
  },
  setup(props: any, context: any) {
    const editionValue = ref(props.initValue);
    const editInput:Ref<HTMLElement | null> = ref(null);

    onMounted(async () => {
      if (editInput.value != null) {
        editInput.value.focus();
      }
    });
    return {
      editInput,
      editionValue,
      saveEdition() {
        context.emit('save-edition', editionValue.value);
      },
      discardEdition() {
        context.emit('discard-edition', editionValue.value);
      },
    };
  },
});
</script>

<style scoped>
</style>
