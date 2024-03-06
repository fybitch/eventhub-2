import { create } from "zustand";

const useUserProfileStore = create((set) => ({
	userProfile: null,
	setUserProfile: (userProfile) => set({ userProfile }),
	// this is used to update the number of events in the profile page
	addEvent: (event) =>
		set((state) => ({
			userProfile: { ...state.userProfile, events: [event.id, ...state.userProfile.events] },
		})),

	deleteEvent: (eventId) =>
		set((state) => ({
			userProfile: {
				...state.userProfile,
				events: state.userProfile.events.filter((id) => id !== eventId),
			},
		})),
}));

export default useUserProfileStore;