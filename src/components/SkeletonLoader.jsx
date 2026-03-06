const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  if (type === 'hero') {
    return (
      <div className="skeleton-hero">
        <div className="skeleton-hero-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
          <div className="skeleton-buttons">
            <div className="skeleton-button"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="skeleton-row">
      <div className="skeleton-row-title"></div>
      <div className="skeleton-cards">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-card-image"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
