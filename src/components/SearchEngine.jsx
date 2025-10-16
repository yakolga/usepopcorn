import { useState } from "react";

export default function SearchEngine() {
    const [query, setQuery] = useState("");

    return(
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
    )
}