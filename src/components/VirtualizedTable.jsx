import { AutoSizer, List } from "react-virtualized";

const VirtualizedTable = ({ data, columns, height = 400 }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center p-5 text-muted">
        <i className="bi bi-table" style={{ fontSize: "3rem" }}></i>
        <p className="mt-3">No data to display</p>
        <small>Run a query or select a table to view data</small>
      </div>
    );
  }

  const rowRenderer = ({ index, key, style }) => {
    const row = data[index];
    const isEven = index % 2 === 0;

    return (
      <div
        key={key}
        style={style}
        className={`d-flex ${isEven ? "bg-light" : "bg-white"}`}
      >
        {columns.map((column, colIndex) => (
          <div
            key={colIndex}
            className="border-end p-2 text-truncate"
            style={{
              width: `${100 / columns.length}%`,
            }}
            title={row[column]}
          >
            {typeof row[column] === "number" &&
            (column.includes("price") ||
              column.includes("amount") )
              ? `$${row[column].toLocaleString()}`
              : row[column]}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ height: height, width: "100%" }}>
      {/* Header */}
      <div className="d-flex bg-dark text-white sticky-top">
        {columns.map((column, index) => (
          <div
            key={index}
            className="border-end p-2 fw-bold text-truncate"
            style={{
              width: `${100 / columns.length}%`,
              minWidth: "120px",
              fontSize: "0.875rem",
            }}
          >
            {column} <i className="bi bi-arrow-up-down ms-1"></i>
          </div>
        ))}
      </div>

      {/* Virtualized Body */}
      <AutoSizer>
        {({ height: autoHeight, width }) => (
          <List
            height={autoHeight - 50} // Subtract header height
            rowCount={data.length}
            rowHeight={40}
            rowRenderer={rowRenderer}
            width={width}
            overscanRowCount={5}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default VirtualizedTable;
