const getUserRank = (count) => {
  let defaultRank = 'movie buff';

  if (count > 0 && count <= 10) {
    defaultRank = 'novice';
  } else if (count > 10 && count <= 20) {
    defaultRank = 'fan';
  }

  return `<p class="profile__rating">${defaultRank}</p>`;
};

const createUserLevelTemplate = ({count}) => {
  return `
    <section class="header__profile profile">
      ${count > 0 ? getUserRank(count) : ''}

      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `;
};

export default createUserLevelTemplate;
