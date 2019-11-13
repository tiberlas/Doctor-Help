import React from 'react'

class Footer extends React.Component {

    constructor() {
        super();

        this.state = {
            text: "project for ISA ans PSO 2019/20"
        }
    }

    render() {
        return (
            <footer>
                <h4>{this.state.text}</h4>
            </footer>
        );
    }

} export default Footer