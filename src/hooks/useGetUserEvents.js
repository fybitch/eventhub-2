import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useEventStore from "../store/eventStore";

const useGetUserEvents = () => {
    const [isLoading, setIsLoading] = useState(true);
	const { events, setEvents } = useEventStore();
	const showToast = useShowToast();
	const userProfile = useUserProfileStore((state) => state.userProfile);

	useEffect(() => {
		const getEvents = async () => {
			if (!userProfile) return;
			setIsLoading(true);
			setEvents([]);

			try {
				const q = query(collection(firestore, "events"), where("createdBy", "==", userProfile.uid));
				const querySnapshot = await getDocs(q);

				const events = [];
				querySnapshot.forEach((doc) => {
					events.push({ ...doc.data(), id: doc.id });
				});

				events.sort((a, b) => b.createdAt - a.createdAt);
				setEvents(events);
			} catch (error) {
				showToast("Error", error.message, "error");
				setEvents([]);
			} finally {
				setIsLoading(false);
			}
		};

		getEvents();
	}, [setEvents, userProfile, showToast]);

	return { isLoading, events };
}

export default useGetUserEvents