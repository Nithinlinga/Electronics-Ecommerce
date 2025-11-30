export default function LandingPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Shop the Latest Electronics
      </h2>
      <p className="text-lg text-gray-700 max-w-2xl mb-8">
        Discover cutting-edge gadgets, smart devices, and accessories all in one place.
        ElectroMart brings you the best deals and seamless shopping experience.
      </p>
      <div className="space-x-4">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold">
          Explore Products
        </button>
        <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold">
          Learn More
        </button>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Smartphones</h3>
          <p className="text-gray-600">Latest models with unbeatable prices.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Laptops</h3>
          <p className="text-gray-600">Powerful machines for work and play.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Accessories</h3>
          <p className="text-gray-600">Headphones, chargers, and more.</p>
        </div>
      </div>
    </div>
  );
}