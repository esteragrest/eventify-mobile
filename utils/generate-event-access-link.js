export const generateEventAccessLink = (eventId, accessLink) =>
	`http://localhost:5173/events/${eventId}?accessLink=${accessLink}`
