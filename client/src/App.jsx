import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Event = lazy(() => import("./pages/Event/Events"));
const EventDetail = lazy(() => import("./pages/Event/EventDetails"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Event />} />
          <Route path="/event-detail/:id" element={EventDetail} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
