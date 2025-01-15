
export default function SearchBar({ search, setSearch }) {

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Cerca per indirizzo"
                value={search}
                onChange={handleSearchChange}
            />
        </div>
    );
}