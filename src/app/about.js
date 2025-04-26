// pages/about.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
        <p className="text-gray-600 mt-4 max-w-2xl text-center">
          We are a dedicated company providing amazing services.
        </p>
      </main>
      <Footer />
    </div>
  );
}
