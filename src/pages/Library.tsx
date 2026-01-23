import { useState } from 'react';
import './Library.css';
import UseCasesLibrary from './LibraryComponents/UseCasesLibrary';
import StepsLibrary from './LibraryComponents/StepsLibrary';

export default function Library() {
  const [activeView, setActiveView] = useState<'use-cases' | 'steps'>('use-cases');
  
  // TODO: Get actual user role from authentication context
  // For now, hardcode as 'ai_team_member' for development
  const userRole: 'user' | 'ai_team_member' | 'admin' = 'ai_team_member';
  const showToggle = userRole === 'ai_team_member' || userRole === 'admin';

  return (
    <div className="library-container">
      <div className="library-header">
        <h1>Library</h1>
        <p className="library-subtitle">
          {activeView === 'use-cases' 
            ? 'Explore approved AI use cases and applications'
            : 'Manage workflow steps and configurations'}
        </p>
      </div>

      {showToggle && (
        <div className="library-toggle">
          <button
            className={`toggle-btn ${activeView === 'use-cases' ? 'active' : ''}`}
            onClick={() => setActiveView('use-cases')}
          >
            Use Cases
          </button>
          <button
            className={`toggle-btn ${activeView === 'steps' ? 'active' : ''}`}
            onClick={() => setActiveView('steps')}
          >
            Steps
          </button>
        </div>
      )}

      <div className="library-content">
        {activeView === 'use-cases' && <UseCasesLibrary />}
        {activeView === 'steps' && showToggle && <StepsLibrary userRole={userRole} />}
      </div>
    </div>
  );
}
