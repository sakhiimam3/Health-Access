const LoadingSkeleton = () => (
  <div className="mx-auto px-4 lg:px-8 py-16 max-w-7xl">
    <div className="text-center mb-16">
      <div className="w-32 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 animate-pulse"></div>
      <div className="w-64 h-8 bg-gray-200 rounded-lg mx-auto mb-6 animate-pulse"></div>
      <div className="w-32 h-1.5 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-6 lg:p-8">
            <div className="w-full h-64 bg-gray-200 rounded-xl animate-pulse mb-6 shadow-lg"></div>
            <div className="space-y-3">
              <div className="w-full h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default LoadingSkeleton; 