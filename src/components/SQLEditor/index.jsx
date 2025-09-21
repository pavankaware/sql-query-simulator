import { Card, Form } from "react-bootstrap";

const SQLEditor = ({ sqlQuery, setSqlQuery }) => {
  return (
    <Card className="mb-3 flex-grow-1">
      <Card.Header className="bg-success text-white">
        <h6 className="mb-0">
          <i className="bi bi-code-square me-2"></i> SQL Editor
        </h6>
      </Card.Header>
      <Card.Body className="p-0 d-flex flex-column">
        <Form.Control
          as="textarea"
          value={sqlQuery}
          onChange={(e) => setSqlQuery(e.target.value)}
          placeholder="Enter your SQL query here..."
          className="border-0 flex-grow-1"
          style={{minHeight: "100px"}}
        />
      </Card.Body>
    </Card>
  );
};

export default SQLEditor;
