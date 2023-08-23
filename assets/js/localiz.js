const texts = {
  en: {
    h1: "WELCOME TO THE CAPTIVATING WORLD OF SWEETY KITTY GAMES STUDIO – YOUR TRUSTED GUIDE TO EXCITING JOURNEYS IN THE GAMING UNIVERSE.",
    p: "What makes Sweety Kitty Games Studio special? We create unique worlds where you can unleash your potential, learn to collaborate, and get unforgettable pleasure. Discover limitless opportunities in games based on popular global franchises like Minecraft and SpongeBob. Sweety Kitty Games Studio is a source of impressions and entertainment available on the Google Play platform. Our games will allow you to experience the magic of these unique worlds and immerse yourself in exciting adventures where every choice you make matters. If you are looking for thrilling stories and the opportunity to dive into the worlds of Minecraft and SpongeBob on the Google Play platform, Sweety Kitty Games Studio is your perfect choice. Trust us and dive into a world of entertainment and fantastic adventures!"
  },
  ru: {
    h1: "ДОБРО ПОЖАЛОВАТЬ В УВЛЕКАТЕЛЬНЫЙ МИР SWEETY KITTY GAMES STUDIO – ВАШЕГО НАДЕЖНОГО ПРОВОДНИКА В ЗАХВАТЫВАЮЩИЕ ПУТЕШЕСТВИЯ ПО ИГРОВОЙ ВСЕЛЕННОЙ. МЫ ПРЕДОСТАВЛЯЕМ НЕВЕРОЯТНЫЕ ВПЕЧАТЛЕНИЯ, ОБЪЕДИНЯЯ ВАШУ СТРАСТЬ К ИГРАМ, МИРУ MINECRAFT, А ТАКЖЕ ПЕРСОНАЖАМ ИЗ ГУБКИ БОБА, ЧТОБЫ СОЗДАТЬ НЕЗАБЫВАЕМЫЕ ПРИКЛЮЧЕНИЯ НА ПЛАТФОРМЕ GOOGLE PLAY.",
    p: "Что делает Sweety Kitty Games Studio особенным? Мы создаем уникальные миры, в которых вы сможете раскрыть свой потенциал, научиться сотрудничать и получить незабываемое удовольствие. Откройте для себя безграничные возможности в играх, основанных на популярных мировых франшизах, таких как Minecraft и Губка Боб. Sweety Kitty Games Studio – это источник впечатлений и развлечений, доступных на платформе Google Play. Наши игры позволят вам ощутить магию этих уникальных миров и погрузиться в увлекательные приключения, где каждый ваш выбор имеет значение. Если вы ищете захватывающие истории и возможность погрузиться в миры Minecraft и Губки Боба на платформе Google Play, Sweety Kitty Games Studio – ваш идеальный выбор. Доверьтесь нам и окунитесь в мир развлечений и фантастических приключений!"
  }
};

// Определение текущего языка (в данном случае просто рандомный выбор)
const currentLanguage = Math.random() < 0.5 ? "en" : "ru";

// Замена текста на странице
document.getElementById("h1-element").textContent = texts[currentLanguage].h1;
document.getElementById("p-element").textContent = texts[currentLanguage].p;
