export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
	if(typeof window === "undefined" || !GA_TRACKING_ID) return console.log('disabled GA')
	window.gtag('config', GA_TRACKING_ID, {
		page_path: url,
	})
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
	if(typeof window === "undefined" || !GA_TRACKING_ID) return console.log('disabled GA')
	window.gtag('event', action, {
		event_category: category,
		event_label: label,
		value: value,
	})
}