import { Card, ListGroup } from "react-bootstrap";

const PredefinedQueriesCard = ({
  predefinedQueries = [],   
  loadPredefinedQuery,     
  title = "Predefined Queries" 
}) => {
  return (
    <Card className="mb-4">
      <Card.Header className="bg-primary text-white">
        <h6 className="mb-0">
          <i className="bi bi-bookmark me-2"></i> {title}
        </h6>
      </Card.Header>
      <Card.Body className="p-2">
        <ListGroup variant="flush">
          {predefinedQueries.map((item, index) => (
            <ListGroup.Item
              key={index}
              onClick={() => loadPredefinedQuery(item.query)}
              className="border-0 py-2"
              style={{ cursor: "pointer" }}
            >
              <div className="fw-semibold">{item.name}</div>
              <small className="text-muted">
                {item.query.length > 50
                  ? item.query.substring(0, 50) + "..."
                  : item.query}
              </small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default PredefinedQueriesCard;
