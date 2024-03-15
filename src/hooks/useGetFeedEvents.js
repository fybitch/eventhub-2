import React, { useEffect, useState } from 'react'
import useEventStore from '../store/eventStore';
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import useUserProfileStore from '../store/userProfileStore';
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetFeedEvents = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {events, setEvents} = useEventStore();
  const authUser = useAuthStore(state => state.user);
	const showToast = useShowToast();
	const { setUserProfile } = useUserProfileStore();

	useEffect(() => {
		const getFeedEvents = async () => {
			setIsLoading(true);
			if (authUser.following.length === 0) {
				setIsLoading(false);
				setEvents([]);
				return;
			}
			const q = query(collection(firestore, "events"));
			try {
				const querySnapshot = await getDocs(q);
				const feedEvents = [];

				querySnapshot.forEach((doc) => {
					feedEvents.push({ id: doc.id, ...doc.data() });
				});

				feedEvents.sort((a, b) => b.createdAt - a.createdAt);
				setEvents(feedEvents);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};

		if (authUser) getFeedEvents();
	}, [authUser, showToast, setEvents, setUserProfile]);

	return { isLoading, events };
}

export default useGetFeedEvents