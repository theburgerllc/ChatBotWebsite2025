"use client";
import { useState, useEffect } from "react";
import { RefreshCw, Filter } from "lucide-react";

export default function EventsAdminPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/events${filter ? `?type=${filter}` : ""}`);
      const data = await res.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <main className="section">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">System Events</h1>
          
          <div className="flex items-center gap-4">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
            >
              <option value="">All Events</option>
              <option value="webhook">Webhooks</option>
              <option value="error">Errors</option>
              <option value="info">Info</option>
              <option value="conversion">Conversions</option>
            </select>
            
            <button 
              onClick={fetchEvents}
              className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No events found</div>
        ) : (
          <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Timestamp</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Source</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-t border-white/5">
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {new Date(event.timestamp).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          event.type === "error" ? "bg-red-500/20 text-red-400" :
                          event.type === "webhook" ? "bg-blue-500/20 text-blue-400" :
                          event.type === "conversion" ? "bg-green-500/20 text-green-400" :
                          "bg-gray-500/20 text-gray-400"
                        }`}>
                          {event.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">{event.source}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">
                        <pre className="max-w-md overflow-x-auto">
                          {JSON.stringify(event.data, null, 2)}
                        </pre>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
