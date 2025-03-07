import React, { useState, useEffect } from 'react';
import IPOCard from './IPOCard';
import { Search, Filter, Calendar, ChevronDown } from 'lucide-react';

const API_URL = 'https://finnhub.io/api/v1/calendar/ipo';
const API_TOKEN = 'cv4net9r01qn2gab61sgcv4net9r01qn2gab61t0';

type IPO = {
  id: string;
  name: string;
  symbol: string;
  exchange: string;
  openDate: string;
  closeDate: string;
  priceRange: string;
  lotSize: number;
  status: 'open' | 'upcoming' | 'closed';
};

const IPOList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [savedIPOs, setSavedIPOs] = useState<string[]>([]);
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('2020-01-01');
  const [endDate, setEndDate] = useState('2020-04-30');

  useEffect(() => {
    fetchIPOs();
  }, [startDate, endDate]);

  const fetchIPOs = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}?from=${startDate}&to=${endDate}&token=${API_TOKEN}`);

      if (!response.ok) {
        throw new Error('Failed to fetch IPO data');
      }

      const data = await response.json();

      const transformedData: IPO[] = data.ipoCalendar.map((item: any, index: number) => ({
        id: `${index}`,
        name: item.name || 'N/A',
        symbol: item.symbol || 'N/A',
        exchange: item.exchange || 'N/A',
        openDate: item.date,
        closeDate: item.date,
        priceRange: item.price || 'N/A',
        lotSize: item.numberOfShares || 0,
        status: item.status === 'withdrawn' ? 'closed' : 'upcoming',
      }));

      setIpos(transformedData);
    } catch (err: any) {
      setError(err.message || 'Error fetching IPO data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveIPO = (id: string) => {
    setSavedIPOs((prev) =>
      prev.includes(id) ? prev.filter((ipoId) => ipoId !== id) : [...prev, id]
    );
  };

  const filteredIPOs = ipos.filter((ipo) => {
    const matchesSearch =
      ipo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ipo.symbol.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === 'all' ||
      filter === ipo.status ||
      (filter === 'saved' && savedIPOs.includes(ipo.id));

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <div className="text-center py-12">Loading IPO data...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Controls Section */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">

        {/* Search Bar */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search by company name or symbol"
            className="pl-10 input-primary w-full border border-gray-300 rounded-lg py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Date Range Pickers */}
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="date"
              className="pl-10 input-primary border border-gray-300 rounded-lg py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <span className="hidden md:block">to</span>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="date"
              className="pl-10 input-primary border border-gray-300 rounded-lg py-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <select
            className="pl-10 pr-8 input-primary border border-gray-300 rounded-lg py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All IPOs</option>
            <option value="upcoming">Upcoming</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="saved">Saved</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDown size={16} className="text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* IPO List or No Results */}
      {filteredIPOs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No IPOs found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIPOs.map((ipo) => (
            <IPOCard
              key={ipo.id}
              {...ipo}
              isSaved={savedIPOs.includes(ipo.id)}
              onSave={() => handleSaveIPO(ipo.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IPOList;
