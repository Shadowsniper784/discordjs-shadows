const fs = require('fs');
class timer {
  constructor(dir) {
    this._dir = dir
  }
	start(time) {
		this._time = time;
		this._endTime = time + 7200000;

		const content = this._endTime;
		fs.writeFile(
			`${this._dir}/handlers/time.txt`,
			content,
			err => {
				if (err) {
					console.error(err);
					return;
				}
				//file written successfully
			}
		);
	}
	isEndTime(now) {
		let endTime = this._endTime;

		try {
			const data = fs.readFileSync(`${this._dir}/handlers/time.txt`, 'utf8');
		//	console.log(data);
			endTime = data
		} catch (err) {
			console.error(err);
		}
		var bool = false;
		if (now >= endTime) {
			bool = true;
		}
		return bool;
	}
}
module.exports = timer