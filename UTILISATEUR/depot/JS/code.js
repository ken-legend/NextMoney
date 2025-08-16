<script>
  // Seleksyone tout metòd yo
  const methodItems = document.querySelectorAll('.method-item');

  methodItems.forEach(item => {
    item.addEventListener('click', () => {
      const method = item.getAttribute('data-method');
      
      // Aksyon lè itilizatè klike sou metòd la
      // Ou ka ranplase sa ak louvri yon modal oswa paj nouvo
      alert(`Vous avez choisi: ${method}`);
    });
  });
</script>
