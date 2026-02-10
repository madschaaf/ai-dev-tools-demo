# AI Use Case Icon Feature

## Overview
The AI Use Case Icon is an interactive component that appears on pages to indicate contextual use cases. When users hover over the icon, they see a popup with information about the use case and can favorite it or navigate to view more details.

## Features

### 1. **Subtle Flash Animation**
- The AI icon has a gentle pulsing animation that draws user attention without being intrusive
- The animation runs continuously on a 3-second loop
- On hover, the icon scales up slightly with an enhanced glow effect

### 2. **Hover Popup**
- Displays when user hovers over the AI icon
- Shows:
  - Use case title
  - Description (optional)
  - Link to view the full use case
  - Favorite button (heart icon)

### 3. **Favoriting System**
- Click the heart icon to favorite/unfavorite a use case
- Favorites are stored in localStorage
- Heart fills with color when favorited
- Persists across browser sessions

### 4. **Flexible Positioning**
- Position the icon anywhere on the page using CSS positioning
- Default position: bottom left (20px from bottom, 20px from left)
- Customizable through props

## Component API

### Props

```typescript
interface AIUseCaseIconProps {
  useCase: {
    id: string;           // Unique identifier for the use case
    title: string;        // Display title in popup
    description?: string; // Optional description
    url?: string;         // Optional custom URL (defaults to /use-cases?id={id})
  };
  position?: {
    bottom?: string;
    top?: string;
    left?: string;
    right?: string;
  };
  className?: string;     // Additional CSS classes
}
```

### Usage Example

```tsx
import AIUseCaseIcon from './components/AIUseCaseIcon';

// Basic usage
<AIUseCaseIcon 
  useCase={{
    id: 'use-case-123',
    title: 'How to Create Hero Section Videos',
    description: 'Learn how to create engaging hero section videos.',
    url: '/library?tab=use-cases'
  }}
/>

// Custom positioning
<AIUseCaseIcon 
  useCase={{
    id: 'use-case-456',
    title: 'API Integration Guide'
  }}
  position={{ top: '20px', right: '20px' }}
/>

// With custom class
<AIUseCaseIcon 
  useCase={{
    id: 'use-case-789',
    title: 'Database Setup Tutorial'
  }}
  className="custom-icon"
/>
```

## Implementation Details

### File Structure
```
src/components/
├── AIUseCaseIcon.tsx      # Main component
└── AIUseCaseIcon.css      # Styling and animations
```

### LocalStorage Schema
```typescript
// favoriteUseCases: string[]
localStorage.setItem('favoriteUseCases', JSON.stringify([
  'use-case-123',
  'use-case-456'
]));
```

### CSS Classes
- `.ai-use-case-icon` - Main container
- `.ai-icon-wrapper` - Icon wrapper with positioning
- `.ai-icon` - SVG icon
- `.ai-icon-pulse` - Pulsing animation element
- `.ai-use-case-popup` - Hover popup container
- `.popup-header` - Popup header with title and favorite button
- `.favorite-btn` - Heart button
- `.favorited` - Applied when use case is favorited
- `.popup-description` - Description text
- `.view-use-case-btn` - Link button

## Integration Examples

### Hero Section (Current Implementation)
```tsx
<section className="hero">
  <video autoPlay muted loop className="hero-video">
    <source src={heroVideo} type="video/mp4" />
  </video>
  
  <AIUseCaseIcon 
    useCase={{
      id: 'use-case-1769113567070-0jl8jskw2',
      title: 'How to Create Hero Section Videos',
      description: 'Learn how to create engaging hero section videos like this one using AI tools and GitHub Copilot.',
      url: '/library?tab=use-cases'
    }}
    position={{ bottom: '20px', left: '20px' }}
  />
  
  {/* Other hero content */}
</section>
```

### Other Use Cases

#### Feature Highlight
```tsx
<div className="feature-section">
  <h2>Advanced Search</h2>
  <AIUseCaseIcon 
    useCase={{
      id: 'search-implementation',
      title: 'Implementing Advanced Search',
      description: 'Step-by-step guide to building search functionality'
    }}
    position={{ top: '10px', right: '10px' }}
  />
</div>
```

#### Code Example
```tsx
<pre className="code-block">
  <code>{exampleCode}</code>
  <AIUseCaseIcon 
    useCase={{
      id: 'code-pattern-example',
      title: 'Understanding This Code Pattern'
    }}
    position={{ top: '8px', right: '8px' }}
  />
</pre>
```

#### Interactive Demo
```tsx
<div className="demo-container">
  <AIUseCaseIcon 
    useCase={{
      id: 'interactive-demo',
      title: 'Try This Interactive Demo',
      url: '/demos/interactive'
    }}
    position={{ bottom: '15px', right: '15px' }}
  />
  {/* Demo content */}
</div>
```

## Styling Customization

### Custom Colors
```css
/* Override default colors */
.ai-use-case-icon .ai-icon {
  color: #your-brand-color;
}

.ai-use-case-icon .view-use-case-btn {
  background: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

### Custom Animation Speed
```css
.ai-icon-pulse {
  animation: pulse-flash 2s ease-in-out infinite; /* Faster */
}
```

### Custom Popup Size
```css
.ai-use-case-popup {
  min-width: 320px;
  max-width: 400px;
}
```

## Accessibility

- **Keyboard Navigation**: Icon receives focus and can be activated with Enter/Space
- **ARIA Labels**: Favorite button includes descriptive aria-label
- **Screen Readers**: Semantic HTML with proper heading levels
- **Color Contrast**: Meets WCAG AA standards for text contrast
- **Reduced Motion**: Respects `prefers-reduced-motion` user preference

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Performance Considerations

- **Lazy Loading**: Icon only renders when component is mounted
- **LocalStorage**: Minimal storage impact (array of IDs)
- **Animations**: GPU-accelerated transforms and opacity
- **Event Handlers**: Proper cleanup on unmount

## Future Enhancements

1. **Analytics Integration**: Track icon interactions and favorites
2. **Share Functionality**: Share use case links via social media
3. **Tooltip Preview**: Show quick preview on hover before full popup
4. **Grouped Icons**: Display multiple related use cases
5. **User Preferences**: Sync favorites across devices via backend
6. **A/B Testing**: Test different icon styles and positions
7. **Tutorial Mode**: Highlight icons for first-time users

## Troubleshooting

### Icon Not Appearing
- Check that component is imported correctly
- Verify position values don't place icon outside viewport
- Check z-index conflicts with other elements

### Popup Not Showing
- Verify `isHovered` state is updating
- Check for CSS conflicts with `.ai-use-case-popup`
- Ensure popup has sufficient space to display

### Favorites Not Persisting
- Check browser localStorage is enabled
- Verify JSON parsing/stringification is working
- Check for localStorage quota limits

## Related Documentation

- [Use Case Database Integration](./USE_CASE_DATABASE_INTEGRATION.md)
- [Library Tab Feature](./LIBRARY_TAB_FEATURE.md)
- [Use Case Preview Submission](./USE_CASE_PREVIEW_SUBMISSION.md)

## Changelog

### v1.0.0 (2026-01-25)
- Initial release
- Basic hover popup functionality
- Favoriting system with localStorage
- Subtle flash animation
- Flexible positioning
- Responsive design
- Light/dark mode support
