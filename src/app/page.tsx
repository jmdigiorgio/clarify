import Header from '../components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-primary text-gray-900">
      <Header />
      <main className="container mx-auto p-4">
        <h1>Welcome to Clarity!</h1>
        {/* Add more content here */}
      </main>
    </div>
  );
}
