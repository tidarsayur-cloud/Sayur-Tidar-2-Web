import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { Toaster as Sonner } from "sonner";
// Add page imports here
import Home from "./pages/Home";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router basename="/Sayur-Tidar-2-Web">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Sonner />
    </QueryClientProvider>
  );
}
