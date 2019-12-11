import React from 'react';

export default class CharacterCard extends React.Component {

    checkForFilter = () => {
        if (this.props.character.filteredOut)
            return false;

        if (!this.props.searchedName)
            return true;
        
        return this.props.character.name.toUpperCase().indexOf(this.props.searchedName) > -1;
    }

    render() {
        return this.checkForFilter() && <div className="char-holder">
            <div className="char-card">
                <img src={this.props.character.image} />
                <div className="name">
                    <p>{this.props.character.id} | {this.props.character.name}</p>
                </div>
                <div className="content">
                    <p style={{textAlign: 'left'}}>
                        Species
                        <span style={{float: 'right'}}>
                        {this.props.character.species}
                        </span>
                    </p>
                        <p></p>
                    <p style={{textAlign: 'left'}}>
                        Gender
                        <span style={{float: 'right'}}>
                        {this.props.character.gender}
                        </span>
                    </p>
                    <p style={{textAlign: 'left'}}>
                        Origin
                        <span style={{float: 'right'}}>
                        {this.props.character.origin.name}
                        </span>
                    </p>
                    <p style={{textAlign: 'left'}}>
                        Location
                        <span style={{float: 'right'}}>
                        {this.props.character.location.name}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    }
}