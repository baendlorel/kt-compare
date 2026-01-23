# Vue vs KT.js Performance Comparison

Performance benchmark suite comparing Vue 3 and KT.js frameworks.

## 📁 Project Structure

```
kt-compare/
├── 性能指标说明.md          # Performance metrics documentation (Chinese)
├── vue/                     # Vue 3 implementation
│   ├── index.html
│   ├── main.js
│   ├── App.vue
│   ├── vite.config.js
│   ├── components/
│   │   ├── ComponentA.vue
│   │   ├── ComponentB.vue
│   │   └── NestedNode.vue
│   └── tests/
│       ├── LargeListTest.vue
│       ├── FrequentUpdateTest.vue
│       ├── NestedComponentTest.vue
│       ├── ConditionalRenderTest.vue
│       ├── EventHandlingTest.vue
│       ├── DynamicListTest.vue
│       └── InitializationTest.vue
└── ktjs/                    # KT.js implementation
    ├── index.html
    ├── main.jsx
    ├── App.jsx
    ├── vite.config.js
    ├── components/
    │   ├── ComponentA.jsx
    │   ├── ComponentB.jsx
    │   └── NestedNode.jsx
    └── tests/
        ├── LargeListTest.jsx
        ├── FrequentUpdateTest.jsx
        ├── NestedComponentTest.jsx
        ├── ConditionalRenderTest.jsx
        ├── EventHandlingTest.jsx
        ├── DynamicListTest.jsx
        └── InitializationTest.jsx
```

## 🚀 Quick Start

### Installation

```bash
pnpm install
```

### Run Vue Version

```bash
pnpm dev:vue
```

Visit http://localhost:3000

### Run KT.js Version

```bash
pnpm dev:ktjs
```

Visit http://localhost:3001

## 📊 Test Suite

### 1. Large List Rendering Test

- **Purpose**: Measure rendering performance for large lists
- **Test sizes**: 1,000 / 5,000 / 10,000 items
- **Metrics**: Render time, memory usage, avg per item

### 2. Frequent Update Test

- **Purpose**: Measure performance under high-frequency updates
- **Test**: 100 items updating 1000 frames at ~60fps
- **Metrics**: Total time, avg frame time, FPS, performance rating

### 3. Nested Component Test

- **Purpose**: Test deeply nested component tree performance
- **Structure**: 10 levels deep, 5 children per node
- **Metrics**: Build time, update time, total nodes, avg per node

### 4. Conditional Render Test

- **Purpose**: Measure component switching performance
- **Test**: Toggle between two large components 100 times
- **Metrics**: Total time, avg toggle time, min/max time

### 5. Event Handling Test

- **Purpose**: Test event binding and handling performance
- **Test sizes**: 1,000 / 5,000 buttons with click handlers
- **Metrics**: Binding time, response time, memory usage

### 6. Dynamic List Operations Test

- **Purpose**: Measure list manipulation performance
- **Operations**: Insert/delete at start/middle/end, batch update
- **Metrics**: Operation time for each action

### 7. Initialization Test

- **Purpose**: Measure initial app load performance
- **Test**: Render complex app structure from scratch
- **Metrics**: Initialization time, memory delta

## 📈 How to Compare Results

1. Run both versions side by side
2. Execute the same test on both frameworks
3. Record the metrics shown after each test
4. Compare the numbers (lower is better for time, FPS higher is better)

### Example Comparison Table

| Test              | Vue 3    | KT.js    | Winner |
| ----------------- | -------- | -------- | ------ |
| Large List (1000) | 12.34 ms | 8.56 ms  | KT.js  |
| Frequent Update   | 58.2 fps | 59.8 fps | KT.js  |
| ...               | ...      | ...      | ...    |

## 🔍 Key Differences

### Vue 3

- ✅ Virtual DOM with optimized reconciliation
- ✅ Automatic reactivity system
- ✅ Component re-use and caching
- ❌ Virtual DOM overhead
- ❌ Reactivity tracking overhead

### KT.js

- ✅ Direct DOM manipulation (no virtual DOM)
- ✅ Manual updates via `redraw()`
- ✅ Minimal framework overhead
- ❌ No automatic reactivity
- ❌ Manual state management

## 📝 Testing Tips

1. **Close other applications** to minimize interference
2. **Use Chrome DevTools** Performance Monitor for detailed metrics
3. **Run each test 3-5 times** and take the average
4. **Clear console** between tests
5. **Manually trigger GC** before major tests (Chrome DevTools)

## 🛠️ Build for Production

```bash
# Build Vue version
pnpm build:vue

# Build KT.js version
pnpm build:ktjs
```

## 📄 License

ISC

## 👤 Author

Kasukabe Tsumugi
