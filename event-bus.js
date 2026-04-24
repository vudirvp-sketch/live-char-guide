/**
 * ============================================================================
 * LIVE CHARACTER GUIDE - EVENT BUS v2.0.0
 * ============================================================================
 * 
 * Centralized event bus for widget communication.
 * All connections between widgets go through standardized events on this bus.
 * Never through direct API calls between components.
 * 
 * Architecture (§0.3):
 * - If subscribers or event sources are absent — nothing breaks
 * - Each widget works autonomously
 * - Events go into void if no subscribers
 * - Event naming: source:action (e.g., ocean:updated, mbti:selected)
 * 
 * v2.0.0 additions:
 * - Last-value cache: late subscribers receive the most recent emission
 * - getLast() method for explicit state queries
 * - Prevents the "missed event" race condition between widgets
 * 
 * Event Contract (§2.1-2.2):
 * 
 * Emitted Events:
 *   ocean:updated       — { O, C, E, A, N } (numbers 0–100)
 *   enneagram:selected  — { typeId: number, wings: number[] }
 *   mbti:selected       — { typeCode: string, temperament: string }
 *   mbti:ocean-apply    — { suggestions: { O, C, E, A, N } }
 *   synthesis:exported  — { format: string, content: string }
 * 
 * Integration:
 *   Loaded by lazy-loader.js before any widget initialization.
 *   Access: window.EventBus, window.GuideEvents
 * 
 * @version 2.0.0
 */

(function() {
  'use strict';

  const EventBus = {
    _handlers: new Map(),
    _lastEmitted: new Map(),
    
    /**
     * Emit an event with payload data.
     * All registered handlers for this event will be called.
     * If no handlers exist, nothing happens (safe void).
     * Handler errors are caught and logged, never propagated.
     * The last emitted payload is cached for late subscribers.
     * 
     * @param {string} event - Event name (format: source:action)
     * @param {*} detail - Payload data passed to handlers
     */
    emit(event, detail) {
      // Cache the last emitted value for late subscribers
      this._lastEmitted.set(event, { detail: detail, ts: Date.now() });
      
      const handlers = this._handlers.get(event) || [];
      if (handlers.length === 0) return; // void — safe
      handlers.forEach(h => {
        try { 
          h(detail); 
        } catch (e) { 
          console.warn(`[EventBus] Handler error on "${event}":`, e); 
        }
      });
    },
    
    /**
     * Subscribe to an event.
     * Multiple handlers can subscribe to the same event.
     * If the event was previously emitted, the handler is immediately
     * called with the last cached value (last-value replay).
     * 
     * @param {string} event - Event name to subscribe to
     * @param {Function} handler - Callback function receiving payload
     */
    on(event, handler) {
      if (typeof handler !== 'function') {
        console.warn(`[EventBus] Cannot subscribe non-function to "${event}"`);
        return;
      }
      if (!this._handlers.has(event)) {
        this._handlers.set(event, []);
      }
      this._handlers.get(event).push(handler);
      
      // Replay last emitted value to late subscriber
      if (this._lastEmitted.has(event)) {
        try {
          handler(this._lastEmitted.get(event).detail);
        } catch (e) {
          console.warn(`[EventBus] Replay error on "${event}":`, e);
        }
      }
    },
    
    /**
     * Unsubscribe a handler from an event.
     * 
     * @param {string} event - Event name to unsubscribe from
     * @param {Function} handler - The exact function reference to remove
     */
    off(event, handler) {
      const handlers = this._handlers.get(event) || [];
      const idx = handlers.indexOf(handler);
      if (idx > -1) handlers.splice(idx, 1);
    },

    /**
     * Get the last emitted payload for an event.
     * Returns null if the event was never emitted.
     * 
     * @param {string} event - Event name to query
     * @returns {*} Last emitted payload or null
     */
    getLast(event) {
      if (!this._lastEmitted.has(event)) return null;
      return this._lastEmitted.get(event).detail;
    },

    /**
     * Debug: list all registered events and their handler counts.
     * @returns {Object} Map of event names to handler counts
     */
    debug() {
      const info = {};
      this._handlers.forEach((handlers, event) => {
        info[event] = {
          handlers: handlers.length,
          lastEmitted: this._lastEmitted.has(event)
        };
      });
      return info;
    }
  };

  // Global event contract — must be consistent across all widgets (§2.1)
  const GuideEvents = {
    OCEAN_UPDATED: 'ocean:updated',           // Emitted by OCEAN Insight
    ENNEAGRAM_SELECTED: 'enneagram:selected',  // Emitted by Enneagram Builder
    ENNEAGRAM_OCEAN_SUGGEST: 'enneagram:ocean-suggest', // Emitted by Enneagram Builder (suggestion, not command)
    MBTI_SELECTED: 'mbti:selected',            // Emitted by MBTI Composer
    MBTI_OCEAN_APPLY: 'mbti:ocean-apply',      // Emitted by MBTI Composer
    SYNTHESIS_EXPORTED: 'synthesis:exported'    // Emitted by Persona Synthesis
  };

  // Expose globally — single source of truth for all widgets
  // lazy-loader.js will integrate this during initInteractiveElements()
  if (typeof window.EventBus === 'undefined') {
    window.EventBus = EventBus;
  }
  if (typeof window.GuideEvents === 'undefined') {
    window.GuideEvents = GuideEvents;
  }

  console.log('[EventBus] Initialized v2.0.0 with events:', Object.values(GuideEvents).join(', '));

})();
