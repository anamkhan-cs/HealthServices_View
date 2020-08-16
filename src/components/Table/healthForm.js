import React, { useEffect, useState } from 'react';
import './App.css';
import Firebase from './firebase'
import 'firebase/database';
import Table from './components/Table/Table';
import 'bootstrap/dist/css/bootstrap.min.css';


function Health_Form() {
	const [info, setInfo] = useState({Student: [] })
	const db = Firebase.database().ref();

	/*
	  sets state for info (holds everything in db) and current professor logged in
	*/
	useEffect(() => {
		const handleData = snap => {
			if (snap.val()) {
				let recordsList = []
				for (const student in snap.val()["Student"]) {
					recordsList.push(snap.val()["Student"][student]['record']);
				}
				setInfo({Student: recordsList })

			}
		}
		db.on('value', handleData, error => alert(error));
		return () => { db.off('value', handleData); };
	}, [db]);

	/*
	  gets temperature (trust me, this is the best way to do it rn b/c it gets the most recent temp)
	  in the future, we can just look for temperatures who's datetime matches today's date instead of the most recent date
	*/

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

export default Health_Form;
