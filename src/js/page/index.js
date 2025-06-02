
import { toggleTab, buttonClick } from '../common/ui.js'

document.addEventListener('DOMContentLoaded', () => {
  console.log('🟢 index.js 로드됨!')
  toggleTab('.main-tab')
  buttonClick('.main-button')
})
