document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('.input-group input'),
      table_row = document.querySelectorAll('tbody tr');
  
    search.addEventListener('input', searchTable);
  
    function searchTable() {
      const search_data = search.value.toLowerCase(); // Convert to lowercase for case-insensitive search
      table_row.forEach((row) => {
        const table_data = row.textContent.toLowerCase(); // Convert row text to lowercase
        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
      });
    }
  });
  