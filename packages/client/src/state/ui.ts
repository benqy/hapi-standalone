import { ref } from 'vue'
export const uiState = {
  state: {
    characterSelectShow: ref(true)
  },
  toggleCharacterSelect() {
    this.state.characterSelectShow.value = !this.state.characterSelectShow.value
  }
}
