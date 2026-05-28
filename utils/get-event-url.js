export const getEventUrl = (params, location) => {
	const queryParams = new URLSearchParams(location.search)
	const accessLink = queryParams.get("accessLink") || location.state?.accessLink

	return accessLink ?
		`/api/events/event/${params.eventId}?accessLink=${accessLink}` :
		`/api/events/event/${params.eventId}`
}
