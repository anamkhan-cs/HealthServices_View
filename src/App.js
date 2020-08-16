import React, { useEffect, useState } from 'react';
import './App.css';
import Firebase from './firebase'
import 'firebase/database';
import Table from './components/Table/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [info, setInfo] = useState({ Student: [] })
	const db = Firebase.database();

	// WHERE HEALTH SERVICES CAN CHOOSE WHAT DETERMINES HEALTHY VS UNHEALTHY
	const matchesCriteria = r => {
		// checks if fields exist
		if (Number(r["temp"]) > 100 && r["Severe cough"] === "yes") {
			return true;
		}
		else {
			return false;
		}
		
	}

	// grabs today's recordings and then calls matches Criteria to check if healthy or not
	const handleNotifications = (r, s) => {
		let entries = Object.keys(r)

		if (entries.length !== 0){
			// getting today's date
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();
			today = Date.parse(mm + '/' + dd + '/' + yyyy);

			// check for temperatures set today
			var entryForToday = false;
			for (var i = 0; i < entries.length; i++){
				if (Date.parse(entries[i]) === today){
					entryForToday = true;

					// if matches criteria for unhealthy
					if (matchesCriteria(r[entries[i]])) {
						// EMAIL STUDENT HERE
						db.ref("Student/" + s["Name"] + "/Status").set("unhealthy")
					}
					else {
						db.ref("Student/" + s["Name"] + "/Status").set("healthy")
					}
					db.ref("Student/" + s["Name"] + "/record/" + entries[i] + "/NOTIFIED").set("true")
				}
			}
			if (entryForToday === false){ 
				db.ref("Student/" + s["Name"] + "/Status").set("undocumented")
			}
		}
		else {
			return 0;
		}
	};

	/*
	  sets state for info (holds everything in db) and current professor logged in
	*/
	useEffect(() => {
		const handleData = snap => {
			if (snap.val()) {
				let sList = [];
				for (const student in snap.val()["Student"]) {
					handleNotifications(snap.val()["Student"][student]["record"], snap.val()["Student"][student]);
					sList.push(snap.val()["Student"][student]);
				}
				setInfo({ Student: sList })
			}
		}
		db.ref().on('value', handleData, error => alert(error));
		return () => { db.ref().off('value', handleData); };
	}, [db]);

	return (

		<div className="App">
			<header className="App-header">
				<div className='top-nav'>
					{/* maybe lead to professo's temperature? */}
					<a className='prof-name' href="#course">Northwestern Health Services</a>
				</div>
				<div class="col-sm-6 col-sm-offset-3 temp-tables">
					<div className='temp-table'>
						<Table students={info.Student} />
					</div>
				</div>

			</header>

		</div>
	);
}

export default App;
