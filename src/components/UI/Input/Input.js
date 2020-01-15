import React from 'react';

import classes from './Input.css';

/**
 * 
 * @param {*} props 
 * 
 * Input UI element
 */
const input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];

    // validation check
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.elementConfig.placeholder}!</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                onChange={props.changed}
                {...props.elementConfig}
                value={props.value} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={classes.InputElement}
                onChange={props.changed}
                {...props.elementConfig}
                value={props.value} />
            break;
        case ('select'):
            inputElement = (
                <select
                    className={classes.InputElement}
                    onChange={props.changed}
                    value={props.value}>
                    {props.elementConfig.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                    ))}
                </select>)
            break;
        default:
            inputElement = <input
                className={classes.InputElement}
                onChange={props.changed}
                {...props.elementConfig}
                value={props.value} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;