import { Card, ListGroup, Badge } from "react-bootstrap";

const QueryHistoryCard = ({
  queryHistory = [],      
  loadHistoryQuery,     
  title = "Query History" 
}) => {
  return (
    <Card>
      <Card.Header className="bg-secondary text-white">
        <h6 className="mb-0">
          <i className="bi bi-clock-history me-2"></i> {title}
        </h6>
      </Card.Header>
      <Card.Body className="p-2">
        <ListGroup variant="flush">
          {queryHistory.map((query, index) => (
            <ListGroup.Item
              key={index}
              onClick={() => loadHistoryQuery(query)}
              className="border-0 py-2"
            >
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">#{index + 1}</small>
                <Badge bg="info" className="ms-2">
                  Recent
                </Badge>
              </div>
              <div className="mt-1">
                {query.length > 40 ? query.substring(0, 40) + "..." : query}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default QueryHistoryCard;
