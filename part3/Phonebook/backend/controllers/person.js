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
		return response.status(201).json(savedPerson)
	} catch (error) {
		return next(error)
	}
}


const getAllPersons = async (request, response, next) => {
	try {
		const persons = await Phonebook.find({})
		return response.json(persons)
	} catch (error) {
		return next(error)
	}
}

const getUserById = async (request, response, next) => {
	try {
		const { id } = request.params
		const person = await Phonebook.findById(id)

		if (!person) {
			return response.status(404).json({ error: 'person not found' })
		}
		return response.json(person)

	}
	catch (error) {
		return next(error)
	}
}

const deletePerson = async (request, response, next) => {
	try {
		const { id } = request.params
		const deletedPerson = await Phonebook.findByIdAndDelete(id)

		if (!deletedPerson) {
			return response.status(404).json({ error: 'person not found' })
		}
		return response.status(204).end()
	} catch (error) {
		return next(error)
	}
}

const updatePerson = async (request, response, next) => {
	try {
		const { id } = request.params
		const { name, number } = request.body
		if ( !number) {
			return response.status(400).json({ error: 'number is required' })
		}
		const updatedPerson = await Phonebook.findByIdAndUpdate(
			id,
			{ name, number },
			{ returnDocument: 'after', runValidators: true, context: 'query' }
		)
		if (!updatedPerson) {
			return response.status(404).json({ error: 'person not found' })
		}
		else{
			return response.json(updatedPerson)
		}	
	}
	catch (error) {
		return next(error)
	}

}
module.exports = {
	createPerson,
	getAllPersons,
	deletePerson,
	updatePerson,
	getUserById,
}

