import React, { Component } from "react";
import API from "../utils/API";
import { Link } from 'react-router-dom';
import "../styles/inventory.css";

class Inventory extends Component {

  state = {
    inventoryCard: [],
    equippedCards: [],
    activeCard: {},
    discardActive: false
  }

  //on page load call functions for displaying inventory and equipped cards
  componentDidMount() {
    this.loadCards();
  }

  //function to get equipped cards:
  loadCards = () => {
    API.getAllCards(this.props.match.params.id)
      .then(res => {
        this.setState({ equippedCards: res.data.equippedCards })
        this.setState({ inventoryCard: res.data.inventoryCards })
      })
      .catch(err => console.log(err))
  }

  //onclick of inventory image trigger this function:
  //check if the equippedCards array is > 3:
  //if yes alert and use return to exit the function.
  //if not continue on:
  //get the id from the image card
  //get info of this card by looping through the inventoryCard:
  //save the info of the card 
  //set the info into activeCard state
  //exist the loop
  //call API route to update equippedCards if slot is available
  equip = (event) => {
    const id = event.target.id

    //check if discardActive is on? if it is discard clicked on cards
    if (this.state.discardActive) {
      let discardObj = {
        cardId: id,
        userId: this.props.match.params.id
      }
      console.log("This is for discard: " + id)
      API.discardCard(discardObj)
        .then(res => this.componentDidMount())
        .catch(err => console.log)
    } else {


      if (this.state.equippedCards.length > 3) {
        alert("No more cards can be equipped");
        return
      }


      for (let i = 0; i < this.state.inventoryCard.length; i++) {
        if (id === this.state.inventoryCard[i]._id) {
          const newActiveState = { ...this.state.inventoryCard[i] }
          newActiveState.userID = this.props.match.params.id
          this.setState({ activeCard: newActiveState }, this.equipCard)
        }
      }
    }
  }

  equipCard = () => {
    API.updateEquippedCard(this.state.activeCard)
      .then(res => {
        this.componentDidMount();
      })
      .catch(err => console.log(err))
  }

  //onclick event to unequip a currently equipped card:
  //get the id from image card.
  //get info of the card by looping through the equippedCards array
  //save info of card into activeCard state
  //exist loop
  //call API route to remove this card id from equippedCard array in database and add it to the inventoryCard array in database
  unEquip = (event) => {
    const id = event.target.id
    for (let i = 0; i < this.state.equippedCards.length; i++) {
      if (id === this.state.equippedCards[i]._id) {
        const newActiveState = { ...this.state.equippedCards[i] }
        newActiveState.userID = this.props.match.params.id
        this.setState({ activeCard: newActiveState }, this.cardUnEquip)
      }
    }
  }

  cardUnEquip = () => {
    API.unEquipCard(this.state.activeCard)
      .then(res => {
        this.componentDidMount();
      })
      .catch(err => console.log(err))
  }

  toggleDiscard = (event) => {
    event.preventDefault()
    if (!this.state.discardActive) {
      this.setState({ discardActive: true })
    } else {
      this.setState({ discardActive: false })
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Link to={"/home/" + this.props.match.params.id} id="return-home"><button className="btn-lg btn-dark" id="other-home">Return Home</button></Link>
          <div className="col-md-6 inventory-inventory">
            <h2>Current Inventory: {this.state.inventoryCard.length ? this.state.inventoryCard.length : 0} Cards</h2>
            {/* inventory go here */}
            {/* this button will TOGGLE discarding mode */}
            <button
              type="button"
              className={!this.state.discardActive ? "btn btn-success" : "btn btn-danger"}
              onClick={this.toggleDiscard}
            >{!this.state.discardActive ? "Click to Turn Discard Mode on" : "Discard Mode is ON"}</button>
            <div className="row" id="style-inventory">
              {this.state.inventoryCard.length ? (
                <>
                  {this.state.inventoryCard.map(cards => (
                    <div id="my-inventory" key={cards._id}>
                      <img
                        id={cards._id}
                        className="equippedImages"
                        src={process.env.PUBLIC_URL + "/img/cards/" + cards.image}
                        alt={cards.name}
                        attack={cards.attack}
                        onClick={this.equip}
                      />
                      <p id="inventory-card-stats">
                      Name: {cards.name} <br></br>
                      Attack: {cards.attack} <br></br>
                      Defense: {cards.defense} <br></br>
                      Health: {cards.hitPoints}
                      </p>
                    </div>
                  )
                  )
                  }
                </>
              )
                : (<h3>No Cards in Inventory</h3>)}
            </div>
          </div>

          <div className="col-md-5 inventory-equipped">
            <h2>Currently Equipped</h2>
            <div className="row" id="style-equipped">
              {/* equipped cards go here */}
              {this.state.equippedCards.length ? (
                <>
                  {this.state.equippedCards.map(cards => (
                    // <div className="col col-md-3" key={cards._id}>
                    <div key={cards._id}>
                      <img
                        id={cards._id}
                        className="equippedImages"
                        src={process.env.PUBLIC_URL + "/img/cards/" + cards.image}
                        alt={cards.name}
                        onClick={this.unEquip}
                      />
                      <p id="equipped-card-stats">
                      Name: {cards.name} <br></br>
                      Attack: {cards.attack} <br></br>
                      Defense: {cards.defense} <br></br>
                      Health: {cards.hitPoints}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                  <h3>No Card Equipped</h3>
                )}
            </div>
          </div>
        </div>
      </div >
    )

  }
}

export default Inventory;