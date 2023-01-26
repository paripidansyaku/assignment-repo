// Initial numbers of row and column.
let rowNumber = 10;
let columnNumber = 10;

// To create a 2-dimensional array holding the table data.
const createMultiplicationArray = (rowNumber, columnNumber) => {
  let multiplicationArray = new Array(rowNumber);

  for (rowIndex = 0; rowIndex < rowNumber; rowIndex++) {
    multiplicationArray[rowIndex] = new Array(columnNumber);

    for (columnIndex = 0; columnIndex < columnNumber; columnIndex++) {
      multiplicationArray[rowIndex][columnIndex] = `${rowIndex + 1} x ${columnIndex + 1} = ${
        (rowIndex + 1) * (columnIndex + 1)
      }`;
    }
  }

  return multiplicationArray;
};

// To create table element using the table data created by createMultiplicationArray
const createTableContent = (multiplicationArray, table) => {
  multiplicationArray.forEach((record) => {
    const tr = document.createElement("tr");
    const fragment = document.createDocumentFragment();

    // Add td elements into a fragment.
    record.forEach((field) => {
      const th = document.createElement("td");
      const text = document.createTextNode(field);
      th.appendChild(text);
      fragment.appendChild(th);
    });

    tr.appendChild(fragment);
    table.appendChild(tr);
  });
};

// In this function, the table will be attached to #multilicationTableContainer element.
const createTable = () => {
  const tableContainer = document.querySelector("#multilicationTableContainer");
  // Remove table if it already exists.
  if (tableContainer.hasChildNodes()) {
    tableContainer.removeChild(tableContainer.firstChild);
  }

  const table = document.createElement("table");
  table.setAttribute("id", "multiplicationTable");
  tableContainer.appendChild(table);

  const multiplicationArray = createMultiplicationArray(rowNumber, columnNumber);

  createTableContent(multiplicationArray, table);
};

// Add a load event.
window.addEventListener("load", () => {
  createTable();
});

// Add an event for the create a table button.
const createTableBtn = document.querySelector("#createTableBtn");
createTableBtn.addEventListener("click", () => {
  rowNumber = Number(document.querySelector("#row").value);
  columnNumber = Number(document.querySelector("#column").value);

  // Validation
  let intChk = isInt(rowNumber, columnNumber);
  if (intChk) {
    const error = document.querySelector("#errorMessage");
    error.style.display = "none";
  } else {
    const error = document.querySelector("#errorMessage");
    error.style.display = "block";
    return;
  }

  createTable();
});

// To check if the input values are int
const isInt = (rowNum, colNum) => {
  if (Number.isInteger(rowNum) && Number.isInteger(colNum)) {
    return true;
  } else {
    return false;
  }
};
