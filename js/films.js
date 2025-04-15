async function fetchFilms() {
  try {
    const file = await fetch("data/films.json");
    const films = await file.json();
    const filmTableBody = document.querySelector("#filmTable tbody");
    filmTableBody.innerHTML = ""; // Clear existing row

    films.forEach((film) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${film["Movie Title"]}</td>
        <td>${film.Director}</td>
        <td>${film["Release Year"]}</td>
        <td>${film.Genre}</td>
        <td>${film["Your Rating"]}</td>
        <td>${film.Notes}</td>
      `;
      filmTableBody.appendChild(row);
    });
  } catch (error) {
    console.error(
      "Error fetching information from json file. Please check if the file exists and has the proper format",
      error
    );
  }
}

document.addEventListener("DOMContentLoaded", fetchFilms);

function filmSearch() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filmSearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("filmTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function sortFilms(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("filmTable");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
