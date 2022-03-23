import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// Element Plus自动按需引入配置，先执行 npm install -D unplugin-vue-components unplugin-auto-import
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  define: {
    'process.env': {},
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', ".scss"],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/gaode': {
        target: 'https://restapi.amap.com',
        ws: true,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/gaode/, ''),
      },
      '/api': {
        target: 'http://localhost:3021/',
        ws: true,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    // encryption: false,
    assetsDir: "assets", // 静态资源保存目录
    // sourcemap: true, // 输出.map文件
    // 增大打包单个文件最大容量限制
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // 静态资源分类打包
        assetFileNames: "css/[name].[hash].css",
        chunkFileNames: "js/[name].[hash].js",
        entryFileNames: "js/[name].[hash].js",
        // 拆分包  此处手动设置，将项目依赖的第三方包都拆分到独立的js文件，避免vendor包size过大，（不喜欢看到终端的警告）
        manualChunks: {
          // "@supermap/iclient-leaflet": ["@supermap/iclient-leaflet"],
          // 试了一下传字符串也是可以的
          leaflet: ["leaflet"],
          echarts: ["echarts"],
          // "element-plus": ["element-plus"],
          "@element-plus/icons-vue": ["@element-plus/icons-vue"],
          axios: ["axios"],
          vue: ["vue"],
        },
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     return id.toString().split('node_modules/')[1].split('/')[0].toString()
        //   }
        // },
      },
    },
  },
})
