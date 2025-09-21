import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
// Components
import Header from "./components/Header";
import TableListCard from "./components/TableListCard";
import PredefinedQueriesCard from "./components/QueriesCard";
import QueryHistoryCard from "./components/QueryHistoryCard";
import SQLEditor from "./components/SQLEditor";
import QueryResultsTable from "./components/QueryResults";
import { convertToCSV } from "./utils/index";

// Import data generators
import {
  generateUsers,
  generateCustomers,
  generateOrders,
  generateProducts,
} from "./utils/dataGenerator";
import "./App.css";

function App() {
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM users LIMIT 10;");
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [rowCount, setRowCount] = useState(null);
  const [currentTable, setCurrentTable] = useState("users");
  const [queryResults, setQueryResults] = useState([]);
  const [queryError, setQueryError] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [queryHistory, setQueryHistory] = useState([
    "SELECT * FROM users LIMIT 10;",
    'SELECT COUNT(*) FROM orders WHERE status = "completed";',
  ]);

  // Generate large datasets
  const usersData = useMemo(() => generateUsers(1000), []);
  const customersData = useMemo(() => generateCustomers(500), []);
  const ordersData = useMemo(() => generateOrders(2000), []);
  const productsData = useMemo(() => generateProducts(200), []);

  // Tables and Predefined Queries
  const availableTables = useMemo(() => [
    { name: "users", displayName: "Users", data: usersData },
    { name: "customers", displayName: "Customers", data: customersData },
    { name: "orders", displayName: "Orders", data: ordersData },
    { name: "products", displayName: "Products", data: productsData },
  ], [usersData, customersData, ordersData, productsData]);

  const predefinedQueries = useMemo(() => [
    {
      name: "Recent Orders",
      query: "SELECT * FROM orders ORDER BY order_date DESC LIMIT 10;",
    },
    {
      name: "User Stats",
      query: "SELECT COUNT(*) as total_users, AVG(age) as avg_age FROM users;",
    },
    {
      name: "Get All Users",
      query: "SELECT * FROM users;",
    },
    {
      name: "Get All Customers",
      query: "SELECT * FROM customers;",
    },
    {
      name: "Get All Orders",
      query: "SELECT * FROM orders;",
    },
    {
      name: "Get All Products",
      query: "SELECT * FROM products;",
    },
  ], []);

  // Initialize table with users
  useEffect(() => {
    const table = availableTables.find(t => t.name === "users");
    if (table) loadTable(table);
  }, [availableTables]);

  // Predefined query handlers
  const predefinedQueryHandlers = {
    "Recent Orders": () => ordersData.slice(0, 50),
    "User Stats": () => {
      const avgAge = usersData.reduce((sum, u) => sum + u.age, 0) / usersData.length;
      return [{ total_users: usersData.length, avg_age: avgAge.toFixed(2) }];
    },
    "Get All Users": () => usersData,
    "Get All Customers": () => customersData,
    "Get All Orders": () => ordersData,
    "Get All Products": () => productsData,
  };

  // Parse SQL query
  const parseSQLQuery = query => {
    const trimmed = query.trim().toLowerCase();
    const pq = predefinedQueries.find(p => p.query.toLowerCase() === trimmed);
    if (pq && predefinedQueryHandlers[pq.name]) return predefinedQueryHandlers[pq.name]();
    throw new Error("Only predefined queries are supported in this demo.");
  };

  // Execute query
  const executeQuery = async () => {
    setIsExecuting(true);
    setQueryError(null);
    try {
      await new Promise(res => setTimeout(res, 1000)); // simulate delay
      const results = parseSQLQuery(sqlQuery);
      setQueryResults(results);
      setExecutionTime("0.003s");
      setRowCount(results.length);
      if (!queryHistory.includes(sqlQuery)) {
        setQueryHistory([sqlQuery, ...queryHistory.slice(0, 9)]);
      }
    } catch (error) {
      setQueryError("Error executing query: " + error.message);
    } finally {
      setIsExecuting(false);
    }
  };

  // Load table
  const loadTable = table => {
    setCurrentTable(table.name);
    setQueryResults(table.data);
    setRowCount(table.data.length);
    setSqlQuery(`SELECT * FROM ${table.name};`);
  };

  const loadTableData = tableName => {
    const table = availableTables.find(t => t.name === tableName);
    setCurrentTable(tableName);
    if (table) loadTable(table);
  };

  // Load predefined/history queries
  const loadPredefinedQuery = query => setSqlQuery(query);
  const loadHistoryQuery = query => setSqlQuery(query);

  // Table columns
  const getTableColumns = data => (data.length ? Object.keys(data[0]) : []);

  const exportToCSV = () => {
    if (!queryResults.length) return alert("No data to export");
    setIsExporting(true);
      try {
        const blob = new Blob([convertToCSV(queryResults)], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `query_results_${new Date().toISOString().split("T")[0]}.csv`;
        link.click();
        setIsExporting(false);
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 3000);
      } catch (err) {
        alert("Error exporting data: " + err.message);
        setIsExporting(false);
      }
  };

  return (
    <div className="app-container light-theme">
      <Header />
      <Container fluid className="p-0">
        <Row className="g-0" style={{ height: "calc(100vh - 56px)" }}>
          {/* Sidebar */}
          <Col md={3} className="bg-light border-end" style={{ height: "100%", overflowY: "auto" }}>
            <div className="p-3">
              <TableListCard
                availableTables={availableTables}
                currentTable={currentTable}
                loadTableData={loadTableData}
              />
              <PredefinedQueriesCard
                predefinedQueries={predefinedQueries.slice(0, 3)}
                loadPredefinedQuery={loadPredefinedQuery}
              />
              <QueryHistoryCard
                queryHistory={queryHistory}
                loadHistoryQuery={loadHistoryQuery}
              />
            </div>
          </Col>

          {/* Main Content */}
          <Col md={9} className="d-flex flex-column" style={{ height: "100%" }}>
            <div className="p-3 flex-grow-1 d-flex flex-column">
              {/* SQL Editor */}
              <SQLEditor sqlQuery={sqlQuery} setSqlQuery={setSqlQuery} />

              {/* Run Query Button & Info */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Button
                  variant="primary"
                  onClick={executeQuery}
                  disabled={isExecuting || !sqlQuery.trim()}
                  className="px-4"
                >
                  {isExecuting ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" /> Executing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-play-circle me-2"></i> Run Query
                    </>
                  )}
                </Button>
                <div className="d-flex gap-3">
                  {executionTime && (
                    <Badge bg="info" className="px-3 py-2">
                      <i className="bi bi-stopwatch me-1"></i> {executionTime}
                    </Badge>
                  )}
                  {rowCount !== null && (
                    <Badge bg="success" className="px-3 py-2">
                      <i className="bi bi-table me-1"></i> {rowCount} rows
                    </Badge>
                  )}
                  {exportSuccess && (
                    <Badge bg="success" className="px-3 py-2">
                      <i className="bi bi-check-circle me-1"></i> Exported!
                    </Badge>
                  )}
                </div>
              </div>

              {/* Query Results Table */}

              <QueryResultsTable
                currentTable={currentTable}
                queryResults={queryResults}
                queryError={queryError}
                executionTime={executionTime}
                onExport={exportToCSV}
                isExporting={isExporting}
                onReset={() => {
                  const table = availableTables.find(t => t.name === currentTable);
                  setQueryError(false);
                  if (table) loadTable(table);
                }}
                getTableColumns={getTableColumns}
                height={400}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
