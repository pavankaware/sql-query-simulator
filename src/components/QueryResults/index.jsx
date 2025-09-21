import { Card, Badge, Button, Spinner, Alert } from "react-bootstrap";
import VirtualizedTable from "../VirtualizedTable";

const QueryResultsTable = ({
  currentTable,
  queryResults,
  queryError,
  executionTime,
  onExport,
  isExporting,
  onReset,
  getTableColumns,
  height = 400,
}) => (
  <Card className="flex-grow-1">
    <Card.Header className="bg-info text-white d-flex justify-content-between align-items-center">
      <h6 className="mb-0">
        <i className="bi bi-table me-2"></i> Query Results
        {currentTable && (
          <Badge bg="light" text="dark" className="ms-2">{currentTable}</Badge>
        )}
      </h6>
      <div>
        <Button
          variant="outline-light"
          size="sm"
          className="me-2"
          onClick={onExport}
          disabled={!queryResults.length || isExporting}
        >
          {isExporting ? <Spinner animation="border" size="sm" className="me-1" /> : <i className="bi bi-download me-1"></i>} Export
        </Button>
        <Button
          variant="outline-light"
          size="sm"
          onClick={onReset}
        >
          <i className="bi bi-arrow-clockwise me-1"></i> Reset
        </Button>
      </div>
    </Card.Header>
    <Card.Body className="p-0" style={{ maxHeight: `${height}px`, overflowY: "auto" }}>
      {queryError ? (
        <Alert variant="danger" className="m-3">
          <i className="bi bi-exclamation-triangle me-2"></i> {queryError}
        </Alert>
      ) : (
        <VirtualizedTable
          data={queryResults}
          columns={getTableColumns(queryResults)}
          height={height}
        />
      )}
    </Card.Body>
    <Card.Footer className="bg-light text-muted text-center">
      <small>
        Showing {queryResults.length} of {queryResults.length} results
        {executionTime && (
          <span className="ms-3"><i className="bi bi-stopwatch me-1"></i> Executed in {executionTime}</span>
        )}
        {queryResults.length > 100 && (
          <span className="ms-3 text-success">
            <i className="bi bi-lightning me-1"></i> Virtualized rendering ({queryResults.length} rows)
          </span>
        )}
      </small>
    </Card.Footer>
  </Card>
);

export default QueryResultsTable;