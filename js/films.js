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
