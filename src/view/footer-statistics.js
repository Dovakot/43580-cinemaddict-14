const createFooterStatisticsTemplate = (count) => {
  return `
    <section class="footer__statistics">
      <p>${count} ${count === 1 ? 'movie' : 'movies'} inside</p>
    </section>
  `;
};

export default createFooterStatisticsTemplate;
