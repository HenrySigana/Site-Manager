import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/buildtrack/',
})
```

---

### FILE 4: `.gitignore`
Create new file → name it `.gitignore`
```
node_modules
dist
.env
.DS_Store
*.log
