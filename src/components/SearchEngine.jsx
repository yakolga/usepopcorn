import { useRef, useEffect } from "react"

export default function SearchEngine({query, setQuery}) {
  const inputElement = useRef(null);
  useEffect(function() {
    function callback(e) {
      if (document.activeElement === inputElement.current) return; 
      if (e.code === 'Enter') {
        inputElement.current.focus();
        setQuery('')
      }
    }

    document.addEventListener('keydown', callback);

    return function() {
      document.removeEventListener('keydown', callback);
    }
  }, [setQuery]);

  return(
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  )
}