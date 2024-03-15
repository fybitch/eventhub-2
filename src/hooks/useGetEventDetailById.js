import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useEventStore from "../store/eventStore";


const useGetEventDetailById = (id) => {


	const [isLoading, setIsLoading] = useState(true);
	const [eventDetail, setEventDetail] = useState(null);
	const showToast = useShowToast();

	useEffect(() => {
		const getEventDetails = async () => {
			setIsLoading(true);
			setEventDetail(null);
			try {
				const eventDoc = await getDoc(doc(firestore, "events", id));
				if (eventDoc.exists()) {
					setEventDetail(eventDoc.data());
				}
				console.log(eventDoc.data())
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setIsLoading(false);
			}
		};
		
		getEventDetails();
	}, [showToast, id]);

	return { isLoading, eventDetail };


    // const [isLoading, setIsLoading] = useState(true);
	// const showToast = useShowToast();
	// const { eventDetail, setEventDetail } = useEventStore;
  
    // useEffect(() => {
	// 	const getUserEvent = async () => {
	// 		setIsLoading(true);
	// 		try {
	// 			const q = query(collection(firestore, "events"), where("uid", "==", id));
	// 			const querySnapshot = await getDocs(q);

	// 			if (querySnapshot.empty) return setEventDetail(null);

	// 			let eventDoc;
	// 			querySnapshot.forEach((doc) => {
	// 				eventDoc = doc.data();
	// 			});

	// 			setEventDetail(eventDoc);
	// 			console.log(eventDoc)
	// 		} catch (error) {
	// 			showToast("Error", error.message, "error");
	// 		} finally {
	// 			setIsLoading(false);
	// 		}
	// 	};

	// 	getUserEvent();
	// }, [setEventDetail, id, showToast]);

	// return { isLoading, eventDetail };
};


export default useGetEventDetailById