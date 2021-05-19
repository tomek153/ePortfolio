import React, { Component } from "react";
import { FixedSizeList as List } from "react-window";

const height = 35;

class MenuList extends Component {

    render() {
        const { options, children, maxHeight, getValue } = this.props;
        const [value] = getValue();
        const initialOffset = options.indexOf(value) * height;

        return (
            <List
                height={maxHeight}
                itemCount={children.length}
                itemSize={height}
                initialScrollOffset={initialOffset}
            >
                {({ index, style }) => {
                    delete children[index].props.innerProps.onMouseMove;
                    delete children[index].props.innerProps.onMouseOver;

                    return <div className="select-option-div-fast">{children[index]}</div>}}
            </List>
        );
    }
}

export default MenuList;