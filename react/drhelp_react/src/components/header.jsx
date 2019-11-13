import React from 'react';

class Header extends React.Component {

    constructor() {
        super();
    
        this.state = {
            title: "Doctor Help"
        };
    }

    render() {
        return(
            <header>
                <h1>
                    {this.state.title}    
                </h1>
            </header>
        );
    };

} export default Header