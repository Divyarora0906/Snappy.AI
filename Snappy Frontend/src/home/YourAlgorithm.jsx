import React, { useEffect, useState } from "react";
import Card from "../explore/Card";
import { useAuth } from "../context/AuthContext";
const YourAlgorithm = () => {
  const [articles, setArticles] = useState([]);
    const { user } = useAuth();
  const userId = user?.uid; // replace with auth
  
  
  useEffect(() => {
    fetch(`http://localhost:5000/api/recommendations/${userId}`)
      .then((res) => res.json())
      .then((data) => setArticles(data.data || []));
  }, []);

  return (
    <section className="max-w-7xl mx-auto mb-4">
      <h2 className="text-2xl font-bold text-white mb-6">
        🔥 Your Algorithm
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((item) => (
          <Card key={item.id} article={item} />
        ))}
      </div>
    </section>
  );
};

export default YourAlgorithm;