import React, { Component } from 'react';

export class Search extends Component {
    render() {
        const { value,onChange } = this.props;
        return (
            <form>
                <input 
                    type="text" 
                    value={value}
                    onChange={onChange}
                />
            </form>
        );
    }
}