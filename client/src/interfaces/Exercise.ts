interface Exercise {
	id: number
	name: string
	target: string
	equipment: string
	gifUrl: string
	videos: { title: string; link: string }[]
}

export default Exercise