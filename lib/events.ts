import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const EVENTS_FILE = path.join(process.cwd(), "events.json");

export interface SystemEvent {
  id: string;
  timestamp: string;
  type: "webhook" | "error" | "info" | "conversion";
  source: string;
  data: any;
}

export async function logEvent(
  type: SystemEvent["type"],
  source: string,
  data: any
): Promise<void> {
  const event: SystemEvent = {
    id: nanoid(),
    timestamp: new Date().toISOString(),
    type,
    source,
    data
  };

  try {
    let events: SystemEvent[] = [];
    try {
      const content = await fs.readFile(EVENTS_FILE, "utf-8");
      events = JSON.parse(content);
    } catch {
      // File doesn't exist, start fresh
    }

    events.push(event);
    
    // Keep only last 1000 events
    if (events.length > 1000) {
      events = events.slice(-1000);
    }

    await fs.writeFile(EVENTS_FILE, JSON.stringify(events, null, 2));
  } catch (error) {
    console.error("Failed to log event:", error);
  }
}

export async function getEvents(
  limit = 100,
  type?: SystemEvent["type"]
): Promise<SystemEvent[]> {
  try {
    const content = await fs.readFile(EVENTS_FILE, "utf-8");
    let events: SystemEvent[] = JSON.parse(content);
    
    if (type) {
      events = events.filter(e => e.type === type);
    }
    
    return events.slice(-limit).reverse();
  } catch {
    return [];
  }
}
