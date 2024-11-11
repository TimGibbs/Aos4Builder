import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FormControl, ListGroup } from 'react-bootstrap';
import Keyword from '../Types/DataTypes/Keyword';

interface KeywordAutocompleteParams {
  suggestions: Keyword[];
  setKeywordId: (value: string | undefined) => void;
}

const KeywordAutocomplete: React.FC<KeywordAutocompleteParams> = ({
  suggestions,
  setKeywordId: setInputValue,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<Keyword[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState<boolean>(false);
  const [text, setText] = useState<string>("");

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

  const handleSuggestionClick = (suggestion: Keyword) => {
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
    <div ref={wrapperRef}  style={{ position: 'relative' }}>
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

export default KeywordAutocomplete;