import React from 'react';

const FilterSortPanel = ({ filters = {}, setFilters }) => {

    const safeFilters = {
        member: filters.member || '',
        category: filters.category || '',
        sort: filters.sort || 'timestamp-desc',
    };
    // Hanterar ändringar i filter(kategori eller medlem)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ 
            ...prev, 
            [name]: value,
         }));
    };

    return (
        <div className ="flex flex-col md:flex-row gap-4 bg-white p-4 rounded shadow mb-8">
            {/* Filtrera efter medlem */}
            <div className="flex flex-col">
                <label className="text-sm font-medium">Filtrera efter medlem</label>
                <input
                 type="text" 
                 name="member" 
                 value={safeFilters.member}
                 onChange={handleChange}
                 placeholder='Skriv namn...' 
                 className="p-2 border rounded"
                 />
            </div>

            {/* Filtrera efter kategori */}
            <div className="flex flex-col">
                <label className="text-sm font-medium">Kategori</label>
                <select 
                name="category" 
                value={safeFilters.category}
                onChange={handleChange}
                className="p-2 border rounded"
                >
                <option value="">Alla</option>
                <option value="ux">UX</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                </select>
            </div>

            {/* Sortering */}
            <div className="flex flex-col">
                <label className="text-sm font-medium">Sortera efter</label>
                <select 
                name="sort" 
                value={safeFilters.sort}
                onChange={handleChange}
                className="p-2 border rounded"
                >
                    <option value="timestamp-desc">Nyast först</option>
                    <option value="timestamp-asc">Äldst först</option>
                    <option value="title-asc">Titel A-Ö</option>
                    <option value="title-desc">Titel Ö-A</option>
                </select>
            </div>
        </div>
    )
};

export default FilterSortPanel;