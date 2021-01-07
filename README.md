# Reign of React
Welcome to Reign of React, a role playing game with a card collection and party element. This application was created with MongoDB, so players can expect data persistence as they play the game.

Visit the application / game here: https://frozen-garden-53520.herokuapp.com/ 

## Application Overview
Reign of React allows players to venture forth into several map areas, battle opponents and collect cards, all while forging new levels for thier own characters and collecting more powerful cards in order to take on tougher opponents.

## Login / New User
When players visit the entry page of the game, they are greeted with a window to either sign in or create a new account. Those that already have an account will be taken to thier respective home page, while new players will be taken to a class selection page. 

## New Game / Classes
At the class selection page, players will be greeted with a page showing the available classes. There are currenlty three classes in the game (Druid, Mage, Warrior), background information on each of these classes will be displayed upon selection, and the player must select one of these classes in order to continue. Once a class is selected and the user confirms they wish to play, they will be granted four random level 1 cards that act as thier party and will be taken to the home page.

## Home Page
The home page acts as the players main source for additional navigation within the game. From here, player statistics will be displayed, including level, health, attack and defense, as well as the current player image. Towards the bototm of the user interface, the currently eqipped cards / party inventory are displayed, clicking on any of these will lead the user to thier complete inventory and equipped cards. In the upper left portion of the page, players will see a map that can be traveled through by using the arrow keys. Each region on the map consists of a tier and a random opponent to fight. Map tiers determine the difficulty of the opponents the player will encounter, determine the amount of experience points they will be granted on a successful combat phase, and also determine the tier of card they will gain with a victory.

## Inventory / Equipped Cards
If a player visits the inventory page, they will see the cards they currently have within their party and those that are sitting unused in the inventory. If a player has gained a new card they wish to add to the party, they can simply click on the card within the inventory section and it will be added to the party / currently equipped cards. Note that only four party members are allowed at this time, so if a player already has four cards in the party, they must first click on the card to have it moved to the inventory, then click on thier preffered card to have that card move to the active party. Once the party has been set, players can return to the map page and continue with the game.

## Combat
Once a player has selected the realm they wish to visit, they can initiate combat by confirming in the model that they wish to attack. Once they have attacked, they will be brought to that zones arena, and combat will begin. A random monster / enemy is generated at the start of the round (based on those available to win) and players will have the opportunity to attack first. A player can attack with any of the members within the current party, including thier own character, simply by clicking on their respective images, once the player has attacked, the enemy will return an attack against a random party member. This combat phase will continue until either the enemy is defeated or the player has lost all thier party members and thier own character. Note that party members who are knocked to 0HP will no longer have the ability to attack during combat. 

Combat currently only takes attack and health values into consideration as they relate to the resolution of combat.

## Rewards / Penalties
Once combat is resolved, a modal will pop up and provide the player with additional information. If the player was sucessful, they will be granted experience points and a new random card (based on those available to win in that particular zone). If the player lost the round, they will lose experience points as well as a random card within thier current party outfit. In either case, the player will be prompted to return to the home page once combat has been resolved.

## Player Levels
Throughout the game, players gain experience after sucessful combat phases. This experience determines the current level of the player, higher levels have better stat modifiers while lower levels are opposite. Because both a gain and a loss of experience points can happen, players can either get stronger or weaker based on the outcome of combat.

## Technologies Used
- React
- Bootstrap
- JavaScript
- CSS
- MongoDB
- Mongoose

## Future Plans
Future Plans include the following;
- Ability to incorporate defensive values into combat, building logic to add mitigation via this stat
- Ability for classes to have different base stats and thus a different combat experience as they progress through the game
- Ability for classes to have different images for the player character
- Ability for consumables to be introduced that would increase stats temporarily in combat phase
- Ability for consumables to be introduced that would increase stats perminatly throughout game
- Ability for spells to be introduced to the game, likely relient on class selection
- Ability for gear to be added that would increase stats while equipped
- Ability for auction house / shop to be introduced, where players could purchase gear, spells, consumables, cards and also sell excess cards and items
- Ability to set win conditions, either on total card collection, defeating a final boss or through zone domination
- Updated lore and narrative for better user experience

## Known Minor Bugs
- None currently known

## Known Major Bugs
- None currently known

## Contact
- Please feel free to reach out to any of the creators with questions or comments