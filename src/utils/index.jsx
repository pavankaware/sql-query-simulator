  // CSV export
  const convertToCSV = data => {
    if (!data.length) return "";
    const columns = Object.keys(data[0]);
    return [
      columns.join(","),
      ...data.map(row => columns.map(col => {
        const val = row[col];
        if (typeof val === "string" && /[,"\n]/.test(val)) return `"${val.replace(/"/g, '""')}"`;
        return val;
      }).join(","))
    ].join("\n");
  };

  export { convertToCSV };