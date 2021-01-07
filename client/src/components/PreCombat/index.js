import React, { Component } from "react";
import Modal from "react-modal";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.css";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class PreCombat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: true
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        this.subtitle.style.color = "black";
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
        this.props.startRound()
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>REIGN OF REACT</h2>
                    <button id="modal-close" className="btn btn-dark btn-lg" onClick={this.closeModal}>Begin Combat Now</button>
                    <div>Welcome to Reign of React</div>
                </Modal>
            </div>
        );
    }
}

export default PreCombat;