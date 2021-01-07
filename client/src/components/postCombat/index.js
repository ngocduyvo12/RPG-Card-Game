import React, { Component } from "react";
import "./style.css"
import { Redirect } from "react-router-dom"
import Modal from "react-modal";

class PostCombat extends Component {
    state = {
        // items: [],
        redirect: false 
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
        this.setState({ modalIsOpen: true});
    }

    afterOpenModal() {
        this.subtitle.style.color = "white";
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to = "/home" />
        }
    }

    render() {

        return(
            <>
                <div>
                    <div className="jumbotron">
                    <h1>End of Combat</h1>
                        <div className="container">
                            <div className="row">

                                <div className="combat-result col-md-7">
                                    <div>
                                        insert whether player won or lost the round
                                        repercussions of the results
                                    </div>
                                </div>

                                <div className="card-status col-md-5">
                                    <div>
                                        Append image of card that is being gained
                                        Append image of card that is lost
                                    </div>
                                </div>

                                <div className="card-inventory col-md-12">
                                    <div>
                                        Player stats and card inventory will go here
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-lg btn-dark result-submit"
                                    onClick={this.openModal}
                                >Return to Map</button>

                                <Modal

                                    isOpen={this.state.modalIsOpen}
                                    onAfterOpen={this.afterOpenModal}
                                    onRequestClose={this.closeModal}
                                    // style={customStyles}
                                    contentLabel="Example Modal"
                                    >
                                    <>
                                        <div>
                                            <div className="jumbotron" ref={subtitle => this.subtitle = subtitle}>
                                            <h1 ref={subtitle => this.subtitle = subtitle}>End of Combat</h1>
                                                <div className="container" ref={subtitle => this.subtitle = subtitle}>
                                                    <div className="row" ref={subtitle => this.subtitle = subtitle}>

                                                        <div className="combat-result col-md-7" ref={subtitle => this.subtitle = subtitle}>
                                                            <div>
                                                                insert whether player won or lost the round
                                                                repercussions of the results
                                                            </div>
                                                        </div>

                                                        <div className="card-status col-md-5" ref={subtitle => this.subtitle = subtitle}>
                                                            <div>
                                                                Append image of card that is being gained
                                                                Append image of card that is lost
                                                            </div>
                                                        </div>

                                                        <div className="card-inventory col-md-12" ref={subtitle => this.subtitle = subtitle}>
                                                            <div>
                                                                Player stats and card inventory will go here
                                                            </div>
                                                        </div>

                                                        <button
                                                            type="submit"
                                                            className="btn btn-lg btn-dark result-submit"
                                                            onClick={this.setRedirect}
                                                        >Return to Map</button>
                                                        
                                                    </div>
                                                </div>                    
                                            </div>
                                        </div>
                                        </>

                                    </Modal>
                                
                            </div>
                        </div>                    
                    </div>
                </div>
            </>
        )
        
    }

}

export default PostCombat;