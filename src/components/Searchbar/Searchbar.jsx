import { useState } from "react";
import { SearchbarHead, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "./Searchbar.js"

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);
    setValue("");
  };

  return (
    <SearchbarHead>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit" className="button">
          <SearchFormButtonLabel>🔎</SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Search images..."
        />
      </SearchForm>
    </SearchbarHead>
  );
}