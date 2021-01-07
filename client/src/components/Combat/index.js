import React, { Component } from "react";
import EnemyCards from "../EnemyCards";
import PlayerCards from "../PlayerCards";
import PreCombat from "../PreCombat";
import MapInfoCombat from "../MapInfoCombat";
import characters from "../../json/characters.json";
import mapJSON from "../../json/map.json";
import API from "../../utils/API";
import player from "../../json/player.json"
import Modal from "react-modal";
import { Link } from 'react-router-dom';
import "./style.css"

class Combat extends Component {

  state = {
    items: [],
    myCards: [],
    myPlayer: [],
    mapTier: 0,
    myAttack: 1,
    myDefense: 1,
    myCurrentHealth: 1,
    myTotalHealth: 1,
    myLevel: 1,
    myTeam: [],
    myEnemyName: [],
    myEnemyAttack: 1,
    myEnemyDefense: 1,
    myEnemyTotalHealth: 1,
    myEnemyCurrentHealth: 1,
    enemyCardActive: false,
    locationData: {},
    monster: {},
    round: true,
    endRound: false,
    combatLog: "",
    enemyCombatLog: "",
    winCard: {},
    lostCard: {},
    potions: "",
    potionsActive: false
  }

  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(area) {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = "black";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  componentDidMount() {
    this.loadUserInfo();
    this.loadLocationAndMonsterInfo();
    this.setState({
      winCard: this.state.locationData ? characters[this.state.locationData.monsters[Math.floor(Math.random() * 3)]] : {},
      lostCard: this.state.myCards ? this.state.myCards[Math.floor(Math.random() * this.state.myCards.length)] : {},
      result: 0
    });
  }

  loadArena = () => {
    let randomImage = Math.floor(Math.random() * 10)
    // console.log("this is map image" + randomImage)
    document.body.classList.add(`image${randomImage}`)
  }

  loadUserInfo = () => {
    API.getUserId(this.props.match.params.id)
      .then(res => {
        //use exp to get level
        const expThreshHold = 300
        let level = Math.floor((1 + Math.sqrt(1 + 8 * res.data.exp / expThreshHold)) / 2)

        //use equippedCards and user level to get total health and current health at the start of the game:
        let healthNow = (level * 234) + 550
        res.data.equippedCards.map(cards => (
          healthNow += parseInt(cards.hitPoint)
        ))

        //call function to create my team:
        this.createTeam(res, level)

        //set state with data response
        this.setState({
          myCards: res.data.equippedCards,
          myPlayer: res.data,
          myLevel: level,
          myCurrentHealth: healthNow,
          myTotalHealth: healthNow,
          potions: 10
        })
      })
      .catch(err => console.log(err))
  }

  //load location and monster info based on name of the map in param.
  loadLocationAndMonsterInfo = () => {
    //get the data of the map using the name in params
    const locData = mapJSON.find(loc => loc.name === this.props.match.params.location);
    // console.log(locData)
    //get map tier
    const tierData = locData.tier

    //monster stat modifier based on map tier.
    //Do a switch case here to determine enemy stat modifier based on map tier
    //probably better to do a function?
    const monsterStatModifier = this.monsterStatModifier(tierData);
    // console.log("Monster stat modifier: ")
    // console.log(monsterStatModifier)

    //get a random monster from location data
    const monsterID = locData.monsters[(Math.floor(Math.random() * locData.monsters.length))]
    // console.log(locData.monsters[(Math.floor(Math.random() * locData.monsters.length))])
    console.log("mon:", characters[monsterID]);
    this.setState({
      myEnemyName: characters[monsterID].name,
      locationData: locData,
      monster: characters[monsterID],
      mapTier: tierData,
      //set state modifier for monster. Need to be stored in state?
      // monStat: monStatModifier,
      myEnemyAttack: characters[monsterID].attack * 1,
      myEnemyDefense: characters[monsterID].defense * 1,
      myEnemyTotalHealth: characters[monsterID].hitpoints * monsterStatModifier.hpModifier,
      myEnemyCurrentHealth: characters[monsterID].hitpoints * monsterStatModifier.hpModifier,
    });
    console.log("in", locData);
    setTimeout(() => {
      this.loadArena()
    }, 500);
  }

  //function to calculate monster stat modifier based on map tier
  monsterStatModifier = (tierData) => {

    switch (tierData) {
      //if map is tier 1 double enemy HP stats
      case 1:
        //HP modifier
        //attack and defense modifier
        return {
          hpModifier: 2,
          ADModifier: 1
        }
      //if map is tier 2 quadruple enemy HP and random attack defense modifier between 1-1.25
      case 2:
        //HP modifier
        //attack and defense modifier
        return {
          hpModifier: 3,
          ADModifier: (Math.random() * 0.5) + 1
        }
      // return Math.floor(Math.random() * 0.5) + 1.5;
      //if map is tier 3 sextuple enemy stats and random attack and defense modifier between 1.5-1.75
      case 3:
        //HP modifier
        //attack and defense modifier
        return {
          hpModifier: 4,
          ADModifier: (Math.random() * 0.25) + 1.5
        }
      // return Math.floor(Math.random() * 0.5) + 2;
    }
  }

  //modified combat logic:

  //turn the player into a card
  //push to my team array
  //push equipped cards into my team array as well
  //create an array object of the player's team:

  createTeam = (res, level) => {
    var myTeamArray = []
    //determine with image to place based on level:
    var imageSrc = ""
    // if (level < 10) {
    //   imageSrc += player[0].image
    //   // console.log(imageSrc)
    // }

    if (level > 0) {
      let imgLevel = level;
      if (imgLevel > 11) {
        imgLevel = 11
      }
      // console.log(level)
      // console.log(imgLevel)
      imageSrc = player[imgLevel].image
    }
    //make a player card:
    var myPlayerObj = {
      _id: res.data._id,
      name: res.data.userName,
      lvl: level,
      attack: (level * 95) + 123,
      defense: (level * 120) + 123,
      hitPoints: (level * 432) + 800,
      currentHealth: (level * 432) + 800,
      image: imageSrc,
      alive: true
    }
    //push player card to team array
    myTeamArray.push(myPlayerObj)
    // console.log(res.data.equippedCards)

    //push my cards into team array:
    res.data.equippedCards.map(card => {
      card.alive = true;
      card.currentHealth = card.hitPoints;
      return myTeamArray.push(card)
    })
    //set myTeam state to myTeamArray:
    this.setState({ myTeam: myTeamArray })
    // console.log(this.state.myTeam)
  }

  cardAttacked = () => {
    if (this.state.enemyCardActive === false) {
      this.setState({ enemyCardActive: true })
    } else {
      this.setState({ enemyCardActive: false })
    }
  };

  //on click of image, attack the enemy card like the original logic.
  //after player finished attacking, check to see if enemy health is lesser or equal to zero. 
  //If it is end combat and toggle reward modal. 
  //If not then update enemy current health
  //then enemy will loop through the player's team and attack card that still have the state of alive.
  //after enemy attack check health of each member of the player team. If any card have an hp of <= 0. change status to dead.
  //if the number team member alive is >= 0. update health and end this turn by using return to break out of the loop


  attackNow = (event) => {

    if (this.state.potionsActive) {
      //if potions is active the next on click will heal the clicked card
      let thisId = event.target.getAttribute("id")

      //need to do a filter here to grab the card with the same id as the one clicked from my team.
      var healedCard = this.state.myTeam.filter(card => card._id === thisId)
      console.log(healedCard)
      let potionHealsAmount = parseInt(healedCard[0].hitPoints) * 0.5
      let cardHealedHP = parseInt(healedCard[0].currentHealth) + potionHealsAmount
      let cardHpAfterPotion = Math.min((cardHealedHP), healedCard[0].hitPoints)
      healedCard[0].currentHealth = cardHpAfterPotion

      //decrease potions count by 1
      let potionsCount = parseInt(this.state.potions) - 1

      //change the state back to false and update potions count
      this.setState({
        potionsActive: false,
        potions: potionsCount
      })

      let comment = `${event.target.alt} healed for ${potionHealsAmount} health`
      this.setState({ combatLog: comment })

      //take this out for now because it's creating animation bug
      // //let enemy attack
      // this.enemyAttack();

    } else {

      this.cardAttacked();
      //if enemy is already dead, prevent further action. Probably wont be needing this
      if (this.state.myEnemyCurrentHealth <= 0) {
        alert("This enemy has been killed, if you have not been automatically redirected please click to go back 1 page")
        return
      } else {
        //player's attack logic
        let thisAttack = event.target.getAttribute("data-attack");

        //defense mitigation base line: edit this number to increase or decrease mitigation damage from defense
        let mitigation = 2000;
        //take defense into account when attacking
        let thisAttackAfterModified = Math.floor(thisAttack - (thisAttack * (this.state.myEnemyDefense / (mitigation + this.state.myEnemyDefense))))
        // console.log(thisAttackAfterModified)


        let enemyHealthAfterAttack = Math.floor(this.state.myEnemyCurrentHealth - thisAttackAfterModified)

        this.setState({ myEnemyCurrentHealth: enemyHealthAfterAttack })

        //check winning condition here with out waiting for state to set in
        if (enemyHealthAfterAttack <= 0) {
          // alert("You have won")
          const winCard = characters[this.state.locationData.monsters[Math.floor(Math.random() * this.state.locationData.monsters.length)]];
          this.setState({
            result: 1,
            winCard: winCard
          })

          API.addInventory(winCard, this.props.match.params.id, this.state.locationData.experience)
            .then(res => console.log(res))
            .catch(err => console.log(err))
          //toggle reward modal here
          this.openModal();
        }
        //if enemy not dead after attack, call enemyAttack
        else {
          let comment = `${event.target.alt} attacked ${this.state.myEnemyName} for ${thisAttackAfterModified} damage`
          this.setState({ combatLog: comment })
          // console.log(combatLog)
          // setTimeout(this.enemyAttack, 2000)
          this.enemyAttack()
        }
      }
    }
  }

  enemyAttack = () => {
    // alert("hi")
    //loop through player team and attack a random card with state of alive
    //use filter to get an array of still alive cards
    var currentTeamCombat = this.state.myTeam.filter(card => card.alive === true)

    // console.log("current combat team")
    // console.log(currentTeamCombat)
    //get enemy attack and attack a random card in the currentTeamCombat:

    //pick a random card in the currentTeamCombat array:
    //get the index of the card
    const randomCardIndex = Math.floor(Math.random() * currentTeamCombat.length)
    const cardGettingAttacked = currentTeamCombat[randomCardIndex]
    console.log("card getting attacked: ")
    console.log(cardGettingAttacked)
    //get enemy attack:
    let thisAttack = this.state.myEnemyAttack;
    //defense mitigation base line: edit this number to increase or decrease mitigation damage from defense
    let mitigation = 2000;
    //take defense into account when attacking
    let thisAttackAfterModified = Math.floor(thisAttack - (thisAttack * (cardGettingAttacked.defense / (mitigation + cardGettingAttacked.defense))))
    //get health after attack:
    let myCardHealthAfterAttack = Math.max((cardGettingAttacked.currentHealth - thisAttackAfterModified), 0);

    //update current health of the attacked card
    //set state of current health for this card. Use card's ID to update its health in state
    //use for loop to use card id of the attacked card and cross reference to this card in state
    for (let i = 0; i < currentTeamCombat.length; i++) {
      // console.log(currentTeamCombat[i])
      if (cardGettingAttacked._id === currentTeamCombat[i]._id) {
        // console.log("current combat team after updated health:")
        currentTeamCombat[i].currentHealth = myCardHealthAfterAttack
        if (currentTeamCombat[i].currentHealth <= 0) {
          currentTeamCombat[i].alive = false;
        }


        // console.log(currentTeamCombat)
        // console.log("team in state: ")
        // console.log(this.state.myTeam)
        //set current health of the card in current combat team
        //set myTeam array state to this current combat team
        //WHY IS THIS WORKING WITHOUT SETTING STATE????????
        // this.setState({myTeam: currentTeamCombat})

        //checking if any card is alive still
        var checkLost = currentTeamCombat.filter(card => card.alive === true)
        if (checkLost.length < 1) {
          const lostCard = this.state.myCards[Math.floor(Math.random() * this.state.myCards.length)];
          this.setState({
            result: 2,
            lostCard: lostCard
          });
          // Check if lost exp is less than 0 so we won't go under zero when sending an amount to decrement
          const lostExpResult = this.state.myPlayer.exp - this.state.locationData.experience;
          const lostExp = lostExpResult > 0 ? this.state.locationData.experience : this.state.myPlayer.exp;

          API.removeInventory(lostCard, this.props.match.params.id, -lostExp)
            .then(res => console.log(res))
            .catch(err => console.log(err))

          //penalty modal here
          this.openModal();
        }
      }
    }

    //log out enemy attack:
    let comment = `${this.state.myEnemyName} attacked ${cardGettingAttacked.name} for ${thisAttackAfterModified} damage`
    this.setState({ enemyCombatLog: comment })

  }

  //function to trigger potion usage state
  potionsUsage = () => {
    //trigger potion use stage on:
    if (this.state.potionsActive) {
      this.setState({ potionsActive: false })
    } else {
      this.setState({ potionsActive: true })
    }
  }

  goHome = () => {
    this.props.history.push("/home/" + this.props.match.params.id)
  }

  render() {
    return (
      <>
        <div className="jumbotron battle-wrapper" id="combat-wrap">
          <h1>Welcome To The {this.state.locationData ? this.state.locationData.name : ""} Arena</h1>
          <div className="container">
            <div className="row">
              <div className="combat-log col-md-3 fight-logs">
                <p className="my-attack-log">{this.state.combatLog}</p>
                <p className="enemy-attack-log">{this.state.enemyCombatLog}</p>
                <Link to={"/home/" + this.props.match.params.id} ><button className="btn btn-dark" id="surrender">Surrender</button></Link>
              </div>
              <div className="enemy-cards col-md-9" id={this.state.enemyCardActive ? "active-enemy" : "inactive-enemy"}>
                <EnemyCards
                  monster={this.state.monster}
                  hitpoints={this.state.myEnemyCurrentHealth}
                  attack={Math.floor(this.state.myEnemyAttack)}
                  defense={Math.floor(this.state.myEnemyDefense)}
                />
                <div className="progress" id="enemy-hp">
                  <div className="progress-bar progress-bar-danger"
                    id="enemy-health"
                    role="progressbar"
                    aria-valuenow={this.state.myEnemyCurrentHealth}
                    aria-valuemin="0"
                    aria-valuemax={this.state.myEnemyTotalHealth}
                    style={{ width: `${(this.state.myEnemyCurrentHealth / this.state.myEnemyTotalHealth) * 100}%` }}>
                    Current Health : {`${((this.state.myEnemyCurrentHealth / this.state.myEnemyTotalHealth) * 100).toFixed(2)}%`}
                  </div>
                </div>
              </div>

              <input
                type="image"
                src={process.env.PUBLIC_URL + "/img/sprite/potions.png"}
                onClick={this.potionsUsage} />
              <span>x {this.state.potions}</span>
              
              <div className="player-cards col-md-12">
                <>
                  {this.state.myTeam ? (
                    this.state.myTeam.map(cards => (
                      <div key={cards._id} className="player-equipped">
                        <h5> Name: {cards.name}</h5>
                        {/* health will probably be changed to current health for each card */}
                        <h5> Health: {cards.currentHealth}</h5>
                        <div className="progress">
                          <div className="progress-bar progress-bar-danger"
                            role="progressbar"
                            aria-valuenow={cards.currentHealth}
                            aria-valuemin="0"
                            aria-valuemax={cards.hitPoints}
                            style={{ width: `${(cards.currentHealth / cards.hitPoints) * 100}%` }}>
                            Current Health : {`${((cards.currentHealth / cards.hitPoints) * 100).toFixed(2)}%`}
                          </div>
                        </div>
                        <input
                          type="image"
                          id={cards._id}
                          // src={cards.image}
                          src={process.env.PUBLIC_URL + "/img/cards/" + cards.image}
                          alt={cards.name}
                          data-attack={cards.attack}
                          data-alive={cards.alive}
                          disabled={cards.alive ? false : true}
                          //need data for current health and max health
                          onClick={this.attackNow}
                          className="equipped-combat"
                        />
                        <h5>Attack: {cards.attack}</h5>
                        <h5>Defense: {cards.defense}</h5>
                      </div>
                    ))
                  ) : ""}
                </>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Intro */}
        <div className="combat-intro">
          <h1 className="welcome-text">Welcome To The {this.state.locationData ? this.state.locationData.name : ""} Arena</h1>
          <h2 id="fade-text">Best of luck on your endevours, Adventurer...</h2>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          // style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="jumbotron" id="ec-wrapper" ref={subtitle => this.subtitle = subtitle}>
            <h1 ref={subtitle => this.subtitle = subtitle} id="ec">End of Combat</h1>
            <button
              type="submit"
              id="ec-button"
              className="btn btn-lg btn-dark result-submit"
              onClick={this.goHome}
            >Return to Map</button>
            <div className="container" ref={subtitle => this.subtitle = subtitle}>
              <div className="row" ref={subtitle => this.subtitle = subtitle}>
                <div className="combat-result col-md-12" id="player-ec-win" ref={subtitle => this.subtitle = subtitle}>
                  {this.state.result === 1 ?
                    <>
                      <h3>You won a {this.state.winCard.name}</h3>
                      <input
                        type="image"
                        id={this.state.winCard._id}
                        src={process.env.PUBLIC_URL + "/img/cards/" + this.state.winCard.image}
                        alt={this.state.winCard.name}
                        data-attack={this.state.winCard.attack}
                        className="equipped-combat"
                      />
                    </>
                    : ""}
                </div>
                <div className="card-status col-md-12" id="player-ec-lost" ref={subtitle => this.subtitle = subtitle}>
                  {this.state.result === 2 ?
                    <>
                      <h3>You lost your {this.state.lostCard.name}</h3>
                      <input
                        type="image"
                        id={this.state.lostCard._id}
                        src={process.env.PUBLIC_URL + "/img/cards/" + this.state.lostCard.image}
                        alt={this.state.lostCard.name}
                        data-attack={this.state.lostCard.attack}
                        className="equipped-combat"
                      />
                    </>
                    : ""}
                </div>

              </div>
            </div>
          </div>
        </Modal>
      </>
    )
  }
}

export default Combat;