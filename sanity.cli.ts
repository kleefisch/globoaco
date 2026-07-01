import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'pekr6iy4',
    dataset: 'production'
  },
  deployment: {
    appId: 'sjvst2fnsis7aumhxwyggdpi',
    autoUpdates: false,
  }
})
