import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";

// *
const Event = lazy(() => import("./pages/Event/Events"));
const EventDetail = lazy(() => import("./pages/EventDetail/EventDetail"));
const PageInvalid = lazy(() => import("./pages/PageInvalid"));

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Nunito:wght@300;400;600;700", "sans-serif"],
      },
    });
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Event />} />
          <Route path="/event-detail/:id" element={<EventDetail />} />
          <Route path="*" element={PageInvalid} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
