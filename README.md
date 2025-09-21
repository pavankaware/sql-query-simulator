
# SQL Query Simulator

An interactive React application for simulating SQL queries and rendering large datasets in the browser.

## Walkthrough Video
https://www.loom.com/share/1522fe0fb02c4fd389ac4d2733c79091?sid=abac2129-dca4-4339-ad7f-4e5b0016a909

## Deployed Application URL 
https://sql-query-simulator.netlify.app/

## Github repo link 
https://github.com/pavankaware/sql-query-simulator

## Framework & Major Dependencies

- **Framework:** [React](https://react.dev/)  
- **UI Libraries:** [react-bootstrap](https://react-bootstrap.github.io/)
- **Virtualization:** [react-virtualized](https://github.com/bvaughn/react-virtualized) — Efficient rendering of large tables


## Features

- SQL Editor for writing and executing queries
- Table list and predefined queries
- Query history
- Virtualized table rendering for large datasets
- CSV export utility
d   
## Page Load Time

- **Measured Load Time:** 1400 ms for around 3k records 
- **Measurement Method:** Used Lighthouse and Build in Performance API

## Performance Optimisations

- **Virtualized Rendering:** Leveraged `react-virtualized` to efficiently render large datasets (tested 20000+ rows) without crashing the browser.
- **Memoization:** Used and `useMemo` to prevent unnecessary re-renders.
- **Efficient Data Generation:** Custom utility for generating large, realistic datasets.
- **Minimal CSS:** Only essential styles for fast rendering.

## Rendering Large Datasets

- Successfully rendered **over 20,000 rows** using virtualization without browser crashes or performance degradation.

## Running the Project

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Expanding the ESLint configuration

For production, consider using TypeScript and type-aware lint rules. See [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for details.

---
