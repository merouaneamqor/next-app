export default function PopularItems() {
    return (
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-primary-900">Popular items</h2>
          {/* Add popular items content here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-primary-800">Popular Item 1</h3>
              <p className="text-surface-600">Description of popular item 1</p>
            </div>
            <div className="bg-surface-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-primary-800">Popular Item 2</h3>
              <p className="text-surface-600">Description of popular item 2</p>
            </div>
            <div className="bg-surface-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-primary-800">Popular Item 3</h3>
              <p className="text-surface-600">Description of popular item 3</p>
            </div>
          </div>
        </div>
      </div>
    )
  }