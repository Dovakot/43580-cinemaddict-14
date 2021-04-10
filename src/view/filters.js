const getFilterLink = ({
  key,
  title,
  count,
}) => {
  return `
    <a href="#${key}" class="main-navigation__item">
      ${title} <span class="main-navigation__item-count">${count}</span>
    </a>
  `;
};

const createFiltersTemplate = (filters) => {
  return filters.map((filter) => getFilterLink(filter)).join('');
};

export default createFiltersTemplate;
