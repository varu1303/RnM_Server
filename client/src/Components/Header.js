import React from 'react';

export default class Header extends React.Component {

    render() {
        return (<div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100vw',
            height: '60px',
            background: 'black',
            display: 'flex',
            zIndex: 100
        }}>
            <input className="name-input" 
            type="text" 
            placeholder="Search By Name...."
            onChange={this.props.nameEntered} />
        </div>)
    }
}