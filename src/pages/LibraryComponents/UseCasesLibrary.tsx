import { useState, useEffect } from 'react';
import './UseCasesLibrary.css';

interface UseCase {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  business_unit?: string;
  tools?: string[];
  thumbnail_url?: string;
  view_count: number;
  like_count: number;
  last_updated: string;
  status: string;
}

export default function UseCasesLibrary() {
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    level: 'all',
    businessUnit: 'all',
    tools: 'all'
  });
  const [sortBy, setSortBy] = useState<'recent' | 'views' | 'likes'>('recent');

  useEffect(() => {
    fetchApprovedUseCases();
  }, []);

  const fetchApprovedUseCases = async () => {
    try {
      const response = await fetch('/api/use-cases/approved');
      if (response.ok) {
        const data = await response.json();
        setUseCases(data);
      }
    } catch (error) {
      console.error('Error fetching approved use cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUseCases = useCases
    .filter(useCase => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        useCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        useCase.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = filters.category === 'all' || 
        useCase.category === filters.category;
      
      // Level filter
      const matchesLevel = filters.level === 'all' || 
        useCase.level === filters.level;
      
      return matchesSearch && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return b.view_count - a.view_count;
        case 'likes':
          return b.like_count - a.like_count;
        case 'recent':
        default:
          return new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime();
      }
    });

  if (loading) {
    return <div className="loading">Loading approved use cases...</div>;
  }

  return (
    <div className="use-cases-library">
      <div className="library-sidebar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search use cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <h3>Sort By</h3>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            className="filter-select"
          >
            <option value="recent">Most Recent</option>
            <option value="views">Most Viewed</option>
            <option value="likes">Most Liked</option>
          </select>
        </div>

        <div className="filter-section">
          <h3>Filter by Category</h3>
          <select 
            value={filters.category} 
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="productivity">Productivity</option>
            <option value="knowledge">Knowledge</option>
            <option value="developer">Developer</option>
            <option value="security">Security</option>
          </select>
        </div>

        <div className="filter-section">
          <h3>Filter by Level</h3>
          <select 
            value={filters.level} 
            onChange={(e) => setFilters({...filters, level: e.target.value})}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <button 
          onClick={() => {
            setFilters({ category: 'all', level: 'all', businessUnit: 'all', tools: 'all' });
            setSearchQuery('');
          }}
          className="clear-filters-btn"
        >
          Clear All Filters
        </button>
      </div>

      <div className="library-main">
        {filteredUseCases.length === 0 ? (
          <div className="no-results">
            <p>No approved use cases found matching your criteria.</p>
            <p>Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <>
            <div className="results-header">
              <h2>Showing {filteredUseCases.length} Use Cases</h2>
            </div>

            <div className="use-cases-grid">
              {filteredUseCases.map((useCase) => (
                <div key={useCase.id} className="use-case-card">
                  {useCase.thumbnail_url && (
                    <div className="card-thumbnail">
                      <img src={useCase.thumbnail_url} alt={useCase.title} />
                    </div>
                  )}
                  
                  <div className="card-content">
                    <span className="category-badge">{useCase.category.toUpperCase()}</span>
                    <h3>{useCase.title}</h3>
                    <p className="card-description">{useCase.description}</p>
                    
                    <div className="card-meta">
                      <span className="meta-item">
                        👁️ {useCase.view_count} views
                      </span>
                      <span className="meta-item">
                        👍 {useCase.like_count}
                      </span>
                    </div>
                    
                    <div className="card-footer">
                      <span className="level-tag">{useCase.level}</span>
                      <span className="updated-date">
                        Updated: {new Date(useCase.last_updated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
