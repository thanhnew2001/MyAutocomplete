import { useState } from "react";

const AutoComplete = ({ suggestions }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  const onChange = async (e) => {
    const userInput = e.target.value;

    setInput(e.target.value);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);

    const res = await fetch("https://api.techkids.academy/animals")
    const json = await res.json()

    suggestions =  json.Items

    // Filter our suggestions that don't contain the user's input
    const unLinked = suggestions.filter(
      (suggestion) =>
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setFilteredSuggestions(unLinked);
 
  };

  const onClick = (e) => {

    setInput(e.target.innerText);
    console.log(e.target.id)

    setFilteredSuggestions([]);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setInput(filteredSuggestions[activeSuggestionIndex].name);

      console.log(filteredSuggestions[activeSuggestionIndex].id)
      setActiveSuggestionIndex(0);
      setShowSuggestions(false);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        return;
      }

      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return;
      }

      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul class="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;

          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }

          return (
            <li className={className} key={suggestion.id} id={suggestion.id} onClick={onClick}>
              {suggestion.name}
            </li>
          );
        })}
      </ul>
    ) : (
      <div class="no-suggestions">
        <span role="img" aria-label="tear emoji">
          😪
        </span>{" "}
        <em>sorry no suggestions</em>
      </div>
    );
  };

  return (
    <>
      <input class='form-control'
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      {showSuggestions && input && <SuggestionsListComponent />}
    </>
  );
};

export default AutoComplete;

