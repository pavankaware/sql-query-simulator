import React from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";

const TableListCard = ({ availableTables, currentTable, loadTableData, title = "Available Tables" }) => {
  return (
    <Card className="mb-4">
      <Card.Header className="bg-success text-white">
        <h6 className="mb-0">
          <i className="bi bi-table me-2"></i> {title}
        </h6>
      </Card.Header>
      <Card.Body className="p-2">
        <ListGroup>
          {availableTables.map((table, index) => (
            <ListGroup.Item
              key={index}
              onClick={() => loadTableData(table.name)}
              className={`border-0 py-2 ${
                currentTable === table.name ? "bg-primary text-white" : ""
              }`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="fw-semibold">{table.displayName}</div>
                <Badge
                  bg={currentTable === table.name ? "light" : "info"}
                  text={currentTable === table.name ? "dark" : "white"}
                >
                  {table.data.length} rows
                </Badge>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default TableListCard;
