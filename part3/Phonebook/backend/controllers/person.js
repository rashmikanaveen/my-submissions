const Phonebook = require('../models/PhonebookModel')

const createPerson = async (request, response, next) => {
	try {
		const { name, number } = request.body

		if (!name || !number) {
			return response.status(400).json({ error: 'name and number are required' })
		}

		const existingPerson = await Phonebook.findOne({ name })

		if (existingPerson) {
			return response.status(400).json({ error: 'name must be unique' })
		}

		const person = new Phonebook({
			name,
			number,
		})

		const savedPerson = await person.save()
		return response.status(201)
	} catch (error) {
		return next(error)
	}
}

module.exports = {
	createPerson,
}

