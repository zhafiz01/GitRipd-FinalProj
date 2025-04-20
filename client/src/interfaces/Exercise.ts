interface Exercise {
	id?: number
	_id: string
	name: string
	target: string
	equipment: string
	gifUrl: string
	videos: { title: string; link: string }[]
}

export default Exercise