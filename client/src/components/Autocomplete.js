import React, { Component, Fragment , useState} from "react";
import PropTypes from "prop-types";

export default function Autocomplete(props) {
  const propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  const defaultProps = {
    suggestions: []
  };

  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [userInput, setUserInput] = useState("")

  const onChange = e => {
    const { suggestions } = props;
    setUserInput(e.currentTarget.value)

    // Filter our suggestions that don't contain the user's input
    const sug = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setActiveSuggestion(0)
    setFilteredSuggestions(sug)
    setShowSuggestions(true)
  };

  const onClick = e => {

    setActiveSuggestion(0)
    setFilteredSuggestions([])
    setShowSuggestions(false)
    setUserInput(e.currentTarget.value)

  };

  const onKeyDown = e => {

    // User pressed the enter key
    if (e.keyCode === 13) {
      setActiveSuggestion(0)
      setShowSuggestions(false)
      setUserInput(filteredSuggestions[activeSuggestion])
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1)
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1)
    }
  };
  let suggestionsListComponent
  const show = () => {
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.forEach((suggestion, index) => {
              let className;
              if (index === activeSuggestion)
                className = "suggestion-active"
              return <li className={className} key={suggestion} onClick={onClick}> {suggestion}</li>
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }


  }
    return (
      <Fragment>
        {show}
        <input
          className="outline-none border-b-2 p-1 border-gray focus:border-teal-400 col-span-2"  placeholder="Bench Press"
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  
}