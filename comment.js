const fs=require('fs')
const dbPath = './db.json'
exports.findAll = (callback) => {
	fs.readFile(dbPath, (err, data) => {
		if(err) {
			return callback(err)
		}
		const comments = JSON.parse(data.toString()).comments
		callback(null, comments)
	})
}

exports.save = (bodyData,callback) => {
	fs.readFile(dbPath, (err, data) => {
		if(err) {
			return callback(err)
		}
		const dbData = JSON.parse(data.toString())
		const comments = dbData.comments
		bodyData.id = comments[comments.length - 1].id + 1
		comments.push(bodyData)

		const dbDataStr = JSON.stringify(dbData, null, 2)
		fs.writeFile(dbPath, dbDataStr, err => {
			if(err) {
				return callback(err)
			}
			callback(null)
		})
	})
}