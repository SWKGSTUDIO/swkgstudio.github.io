const texts = {
  en: {
    h1: "Minecraft, Sandbox, Survival, Crafting, Building, Adventure, Blocks, Exploration, Creative, Multiplayer, Crafting, Mining, Redstone, World, Mods",
    // p: "SpongeBob, Cartoon, Adventure, Underwater, Bikini Bottom, Krusty Krab, Patrick Star, Sandy Cheeks, Nickelodeon, Animation, Jellyfish, Pineapple, Comedy, Sea Creatures, Fun"
  },
  ru: {
    h1: "Minecraft, Sandbox, Survival, Crafting, Building, Adventure, Blocks, Exploration, Creative, Multiplayer, Crafting, Mining, Redstone, World, Mods",
    // p: "SpongeBob, Cartoon, Adventure, Underwater, Bikini Bottom, Krusty Krab, Patrick Star, Sandy Cheeks, Nickelodeon, Animation, Jellyfish, Pineapple, Comedy, Sea Creatures, Fun"
  }
};

// Определение языка на основе местоположения пользователя
const userLanguage = navigator.language.toLowerCase();
const isRussianLocale = userLanguage.startsWith("ru");

// Определение текущего языка
const currentLanguage = isRussianLocale ? "ru" : "en";

// Замена текста на странице
document.getElementById("h1-element").textContent = texts[currentLanguage].h1;
document.getElementById("p-element").textContent = texts[currentLanguage].p;
