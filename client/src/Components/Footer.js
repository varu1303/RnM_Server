import React, { Fragment } from 'react';

import Filter from './Filter';

export default class Footer extends React.Component {

    state = {
        filter: null
    }

    launchFilter = filterType => {
        this.setState({
            filter: filterType
        })
    }

    closeFilter = (data, type) => {
        if (data)
            this.props.filterValues(type || this.state.filter, data)
        this.setState({ filter: null })
    }

    canReset = type => {
        return Boolean(this.props[type].filter(option => !option.checked).length);
    }

    resetFilter = type => {
        this.closeFilter(this.props[type].map(option => ({...option, checked: true})), type)
    }

    render() {
        
        return (
        <Fragment>
            <div style={{
                position: 'fixed',
                left: 0,
                bottom: 0,
                width: '100vw',
                height: '60px',
                background: 'black',
                display: 'flex',
                zIndex: 100
            }}>
                <div style={{
                    flex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                    {this.props.sort === -1 && <span><i title='Sort Asc' style={{ paddingLeft: '15px', paddingRight: '15px' }} onClick={this.props.sortClicked} className="fa fa-sort-up"></i></span>}
                    {this.props.sort === 1 && <span><i title='Sort Dsc'  style={{ paddingLeft: '15px', paddingRight: '15px' }} onClick={this.props.sortClicked} className="fa fa-sort-down"></i></span>}
                </div>
                <div style={{
                    flex: 15,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <span style={{ margin: '10px', position: 'relative' }}>
                        <i title='Filter by Gender'
                        className="fa fa-male" style={{ paddingLeft: '15px', paddingRight: '15px' }} onClick={() => {this.launchFilter('gender')}}></i>
                        {this.canReset('gender') && <i className="fa fa-times clearFilter" aria-hidden="true" onClick={() => {this.resetFilter('gender')}}></i>}
                    </span>
                    <span style={{ margin: '10px', position: 'relative'  }}>
                        <i title='Filter by Species'
                        className="fa fa-universal-access" onClick={() => {this.launchFilter('species')}}></i>
                        {this.canReset('species') && <i className="fa fa-times clearFilter" aria-hidden="true" onClick={() => {this.resetFilter('species')}}></i>}
                    </span>
                </div>
                <div style={{
                    flex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <span title='Go To Top'><a href="#top"><i className="fa fa-arrow-up"></i></a></span>
                </div>
            </div>
            {this.state.filter && <Filter options={this.props[this.state.filter]} close={this.closeFilter} />}
            {/* <Filter options={this.props[this.state.filter]} close={this.closeFilter} /> */}
        </Fragment>)
    }
}