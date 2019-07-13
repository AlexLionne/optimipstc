import React, {Component} from "react";
import PropTypes from "prop-types";
import {Input, InputGroup, ListGroup, ListGroupItem, Spinner,} from "reactstrap";
import '../css/index.css';

class Autocomplete extends Component {
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array),
        markers: PropTypes.instanceOf(Array)
    };

    static defaultProps = {
        suggestions: [],
        marker: []
    };


    constructor(props) {
        super(props);

        this.state = {
            // The active selection's index
            placeholder: props.placeholder,
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: "",
            isLoading: props.isLoading,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isLoading: nextProps.isLoading})
    }

    onChange = e => {
        const {suggestions} = this.props;
        const {markers} = this.props;
        const userInput = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
    };

    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
    };

    onKeyDown = e => {
        const {activeSuggestion, filteredSuggestions} = this.state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion],
            });

        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            this.setState({activeSuggestion: activeSuggestion - 1});
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({activeSuggestion: activeSuggestion + 1});
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;


        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className={'w100'}>
                        {filteredSuggestions.map((suggestion, index) => {
                            // Flag the active suggestion with a class
                            return (
                                <p className={(index === activeSuggestion ? 'active' : 'clickable')} key={suggestion}
                                   onClick={onClick}>
                                    {suggestion}
                                </p>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <ListGroupItem className={'clickable'}>Aucune suggestion</ListGroupItem>
                );
            }
        }

        return (
            <InputGroup className={'search'}>
                <Input
                    placeholder={'Rechercher'}
                    className={'input'}
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                />
                {this.state.isLoading === true ? <Spinner className={'spinner'}/>
                    : null
                }

                <Input
                    id="id-found"
                    type="hidden"
                    value={userInput}
                />
                <ListGroup className={'w100'}>
                    {suggestionsListComponent}
                </ListGroup>
            </InputGroup>
        );
    }
}

export default Autocomplete;
