import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VTextField,
  VInput,
  VImg,
  VDataTable,
  VTooltip,
  transitions,
  VChip,
  VDialog,
  VSelect,
  VAvatar,
  VDatePicker,
  VMenu,
  VHover,
  VForm,
  VDivider,
  VTimePicker,
  VParallax
} from 'vuetify'
import axios from 'axios'
Vue.use(axios)
import 'vuetify/src/stylus/app.styl'
Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VTextField,
    VInput,
    VImg,
    VDataTable,
    VTooltip,
    VChip,
    VDialog,
    VSelect,
    VAvatar,
    VDatePicker,
    VMenu,
    VHover,
    VForm,
    VDivider,
    VTimePicker,
    VParallax
  },
  theme: {
    primary: '#2196F3',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
