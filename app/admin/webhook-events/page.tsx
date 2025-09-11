"use client";
import { useState, useEffect } from "react";
import { RefreshCw, Filter, ChevronDown, ChevronRight } from "lucide-react";

interface EventRecord {
  ts: number;
  topic: string;
  payload: any;
}

export default function WebhookEventsPage() {
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [expandedEvents, setExpandedEvents] = useState<Set<number>>(new Set());
  const [credentials, setCredentials] = useState({ user: "", pass: "" });
  const [authenticated, setAuthenticated] = useState(false);

  const fetchEvents = async () => {
    if (!authenticated) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const headers: HeadersInit = {
        "Authorization": `Basic ${btoa(`${credentials.user}:${credentials.pass}`)}`
      };
      
      const res = await fetch(
        `/api/admin/webhook-events${filter ? `?topic=${filter}` : ""}`,
        { headers }
      );
      
      if (res.status === 401) {
        setAuthenticated(false);
        setError("Authentication failed");
        return;
      }
      
      if (!res.ok) {
        throw new Error(`Failed to fetch events: ${res.status}`);
      }
      
      const data = await res.json();
      setEvents(data.events || []);
    } catch (err) {
      console.error("Failed to fetch webhook events:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticated(true);
  };

  useEffect(() => {
    if (authenticated) {
      fetchEvents();
    }
  }, [filter, authenticated]);

  // Auto-refresh every 10 seconds when authenticated
  useEffect(() => {
    if (!authenticated) return;
    
    const interval = setInterval(fetchEvents, 10000);
    return () => clearInterval(interval);
  }, [filter, authenticated]);

  const toggleExpanded = (ts: number) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(ts)) {
      newExpanded.delete(ts);
    } else {
      newExpanded.add(ts);
    }
    setExpandedEvents(newExpanded);
  };

  if (!authenticated) {
    return (
      <main className="section">
        <div className="container max-w-md mx-auto">
          <div className="bg-black/40 border border-white/10 rounded-xl p-8">
            <h1 className="text-2xl font-bold mb-6">Webhook Events Admin</h1>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={credentials.user}
                  onChange={(e) => setCredentials({ ...credentials, user: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={credentials.pass}
                  onChange={(e) => setCredentials({ ...credentials, pass: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
                  required
                />
              </div>
              {error && (
                <div className="text-red-400 text-sm">{error}</div>
              )}
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Webhook Events</h1>
          
          <div className="flex items-center gap-4">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg"
            >
              <option value="">All Events</option>
              <option value="conversation">Conversation Events</option>
              <option value="video">Video Events</option>
            </select>
            
            <button 
              onClick={fetchEvents}
              disabled={loading}
              className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {loading && events.length === 0 ? (
          <div className="text-center py-12">Loading webhook events...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No webhook events found. Events will appear here when Tavus sends callbacks.
          </div>
        ) : (
          <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Timestamp</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Topic</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Event Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => {
                    const isExpanded = expandedEvents.has(event.ts);
                    const eventType = event.payload?.event_type || 
                                    event.payload?.status || 
                                    event.payload?.type ||
                                    "unknown";
                    
                    return (
                      <tr key={event.ts} className="border-t border-white/5">
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {new Date(event.ts).toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            event.topic === "conversation" 
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-purple-500/20 text-purple-400"
                          }`}>
                            {event.topic}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-300">
                          {eventType}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleExpanded(event.ts)}
                            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
                          >
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            {isExpanded ? "Hide" : "Show"} Payload
                          </button>
                          {isExpanded && (
                            <pre className="mt-2 p-2 bg-black/50 rounded text-xs overflow-x-auto max-w-xl">
                              {JSON.stringify(event.payload, null, 2)}
                            </pre>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <div className="mt-4 text-sm text-gray-400">
          Auto-refreshes every 10 seconds. Events are stored in diagnostics/events/*.jsonl
        </div>
      </div>
    </main>
  );
}
