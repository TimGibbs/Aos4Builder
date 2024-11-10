import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FormControl, ListGroup } from 'react-bootstrap';
import Warscroll from '../Types/DataTypes/Warscroll';

interface WarscrollNameAutocomplete {
  suggestions: Warscroll[];
  setWarscrollId: (value: string | undefined) => void;
}

const AutocompleteInput: React.FC<WarscrollNameAutocomplete> = ({
  suggestions,
  setWarscrollId: setInputValue,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<Warscroll[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState<boolean>(false);
  const [text, setText] = useState<string| undefined>();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    setInputValue(undefined);
    if (text) {
      const filtered = suggestions.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: Warscroll) => {
    setInputValue(suggestion.id);
    setText(suggestion.name);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef}  style={{ position: 'relative', width: '300px' }}>
      <FormControl
        type="text"
        placeholder="Type to search..."
        value={text}
        onChange={handleChange}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ListGroup
          style={{
            position: 'absolute',
            width: '100%',
            zIndex: 1000,
            maxHeight: '150px',
            overflowY: 'auto',
          }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <ListGroup.Item
              key={index}
              action
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default AutocompleteInput;
