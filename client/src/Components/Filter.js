import React from 'react';
import ReactDOM from 'react-dom';

import Checkbox from './Checkbox';

class Filter extends React.Component {

    state = {
        options: JSON.parse(JSON.stringify(this.props.options)),
        all: true
    }

    
    checkboxRef = React.createRef();

    onCheckChange = (e) => {
        // console.log(e.target.value);
        let intermediate = false;
        let value;
        if (e)
            value = e.target.value;
        this.setState(prevState => {
            let options = prevState.options.map(option => {
                if (value && option.value === value)
                    option.checked = !option.checked;
                return option;
            })

            let all = true;
            options.forEach(option => {
                if (!option.checked)
                    all = false;
                if (option.checked)
                    intermediate = true;
            })

            return { options, all }
        }, () => {
            if (!this.state.all && intermediate)
                ReactDOM.findDOMNode(this.checkboxRef.current).indeterminate = true;
            else
                ReactDOM.findDOMNode(this.checkboxRef.current).indeterminate = false;
        })
    }

    checkAll = () => {
        this.setState(prevState => {

            ReactDOM.findDOMNode(this.checkboxRef.current).indeterminate = false;

            let options = prevState.options.map(option => {
                    option.checked = !prevState.all;
                    return option;
            })

            return {
                all: !prevState.all,
                options
            }
        })
    }

    componentDidMount() {
        this.onCheckChange();
    }

    render() {

        return (<div className='filterBG'>
            <div className='filterModal'>
                <div className='filter-head'>
                    <label  className="check-container"> Check All <input type="checkbox"
                        checked={this.state.all}
                        onChange={this.checkAll}
                        ref={this.checkboxRef}
                    />
                       <span className="checkmark"></span>
                    </label>
                    <span style={{float: 'right'}}>
                        <span style={{ padding: '5px'}} onClick={() => {this.props.close(null)}}>
                            <i className="fa fa-times"></i>
                        </span>
                    </span>
                </div>
                <div className='filter-body'>
                    {this.state.options.map(option => <label key={option.value} className="check-container">{option.value}<Checkbox
                        value={option.value} 
                        checked={option.checked}
                        onChange={this.onCheckChange}
                     />
                     <span className="checkmark"></span></label>)}
                </div>
                <div className='filter-footer'>
                    <button onClick={() => {this.props.close(this.state.options)}}>
                        Apply
                    </button>
                </div>

            </div>
        </div>)
    }
}

export default Filter;