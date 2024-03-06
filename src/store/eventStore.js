import { create } from 'zustand'

const useEventStore = create((set) => ({
    events: [],
    createEvent: (event) => set(state => ({ events: [event, ...state.events] })),
    deleteEvent: (id) => set((state) => ({ events: state.events.filter((event) => event.id !== id) })),
    // add Comment
    setEvents: (events) => set({ events }),
}))

export default useEventStore