import 'firebase/database';
import 'firebase/storage';
import React, { useState } from "react";
import { Tooltip } from "@material-ui/core";
import Popup from "reactjs-popup";

const Table = ({ course, students }) => {
    // state for which students to show for filter
    const [onlyUnhealthy, setOnlyUnhealthy] = useState(false);

    // gets updated record and date for each student
    const getTemp = s => {
        var i = 0;
        for (i = 0; i < students.length; i++) {
            if (s["Name"] === students[i]["Name"]) {
                let entries = Object.keys(students[i]["record"])

                // if the student has temperatures recorded, get most recent temp
                if (entries.length !== 0) {
                    let max = 0;
                    let dT = "";
                    for (const entry in entries) {
                        if (Date.parse(entries[entry]) > max) {
                            max = Date.parse(entries[entry]);
                            dT = entries[entry]
                        }
                    }

                    return [students[i]["record"][dT]["temp"], dT];
                }
                else {
                    return ("-", "-");
                }
            }
        }
        return ("-", "-")
    }

    function getRecord(student) {
    }

    function getStatus(status) {
        if (status === 'healthy') {
            return (
                <div className='status-healthy'>Status: {status}</div>
            )
        } else {
            return (
                <div className='status-unhealthy'>Status: {status}</div>
            )
        }
    }

    // gets record for popup
    function getLastRecord(obj) {
        var record = JSON.stringify(obj[Object.keys(obj)[Object.keys(obj).length - 1]])
        record = record.replace('{', '')
        record = record.replace('}', '')
        record = record.replace(/"/g, '')
        record = record.replace(/,/g, '\n')
        record = record.replace(/:/g, ': ')
        var newIndex = record.lastIndexOf("url:");
        var cleanRecord = record.substring(0, newIndex)

        return (
            <div>
                {String(cleanRecord).split("\n").map((i, key) => {
                    return <div key={key}>{i}</div>;
                })}
            </div>);
    }

    // gets image for popup
    function getImageURL(obj) {
        var record = JSON.stringify(obj[Object.keys(obj)[Object.keys(obj).length - 1]])
        record = record.replace('{', '')
        record = record.replace('}', '')
        record = record.replace(/"/g, '')
        record = record.replace(/,/g, '\n')
        var index = record.lastIndexOf("url:");
        var imageURL = record.substring(index + 4)
        if (imageURL === "" || imageURL === "url goes here") {
            return (
                <i>No image found.</i>
            )
        } else {
            return (
                <img src={imageURL} alt="temperature" />
            )
        }
    }


    // gets records for popup
    function getAllRecord(obj) {
        var record = JSON.stringify(obj)
        console.log('!!!!!!!!!!!!!')
        console.log('record before:', record)
        record = record.replace(/:{/g, '\n')
        record = record.replace(/"url":"url goes here"/g, '--------------------')
        record = record.replace(/{/g, '')
        record = record.replace(/}/g, '')
        record = record.replace(/"/g, '')
        record = record.replace(/,/g, '\n')
        record = record.replace(/:/g, ': ')
        record = record.replace(/url:/g, '--------------------')
        record = record.replace(/--------------------(.*)/g, '--------------------')
        var index = record.lastIndexOf("--------------------");
        record = record.substring(0, index)
        return (
            <div>
                {String(record).split("\n").map((i, key) => {
                    return <div key={key}>{i}</div>;
                })}
            </div>);
    }


    // checks for healthy vs unhealthy vs undocumented, checks filter for only unhealthy or all
    return (
        <div id="table-container">
            <button class="btn btn-warning" onClick={() => setOnlyUnhealthy(!onlyUnhealthy)}>{onlyUnhealthy ? "Show All Students" : "Show Only Unhealthy Students"}</button>
            <table className="course-table table-bordered">
                <thead>
                    <th scope="col">Student Name</th>
                    <th scope="col">Latest Temperature</th>
                    <th scope="col">Date of Temperature</th>
                </thead>

                <tbody>
                    {students.map((s) =>
                        s["Status"] === "unhealthy" ?
                            <Popup trigger={
                                <tr onClick={() => getRecord(s)}>
                                    <td class="unhealthy">{s["Name"]}</td>
                                    <Tooltip title="temperature not within healthy range" aria-label="temperature not within healthy range">
                                        <td>{getTemp(s)[0]}</td>
                                    </Tooltip>
                                    <td>{getTemp(s)[1]}</td>
                                </tr>}>
                                <div className='health-record'>
                                    <Popup className='health-record-popup' trigger={
                                        <div className='name' onClick={() => getRecord(s)}>{s["Name"]}</div>
                                    }>
                                        Health record:
                                        <div className='history'>{getAllRecord(s["record"])}</div>
                                    </Popup>

                                    {getStatus(s["Status"])}
                                    <div className='latest-record'>
                                        details:<br></br>
                                        {getLastRecord(s["record"])}
                                        <div className='temp-img'>{getImageURL(s["record"])}</div>
                                    </div>
                                </div>
                            </Popup>


                            : s["Status"] === "healthy" ? onlyUnhealthy ? console.log("") :
                                <Popup trigger={
                                    <tr onClick={() => getRecord(s)}>
                                        <td class="healthy">{s["Name"]}</td>
                                        <Tooltip title="temperature within healthy range" aria-label="temperature within healthy range"><td>{getTemp(s)[0]}</td></Tooltip>
                                        <td>{getTemp(s)[1]}</td>
                                       
                                    </tr>}>
                                    <div className='health-record'>
                                        <Popup className='health-record-popup' trigger={
                                            <div className='name' onClick={() => getRecord(s)}>{s["Name"]}</div>
                                        }>
                                            Health record:
                                        <div className='history'>{getAllRecord(s["record"])}</div>
                                        </Popup>
                                        {getStatus(s["Status"])}
                                        <div className='latest-record'>
                                            details:<br></br>
                                            {getLastRecord(s["record"])}
                                            <div className='temp-img'>{getImageURL(s["record"])}</div>
                                        </div>
                                    </div>
                                </Popup>
                                :
                                onlyUnhealthy ? console.log("") :

                                    <Popup trigger={
                                        <tr onClick={() => getRecord(s)}>
                                            <td class="undocumented">{s["Name"]}</td>
                                            <Tooltip title="temperature within healthy range" aria-label="temperature within healthy range"><td>{getTemp(s)[0]}</td></Tooltip>
                                            <td>{getTemp(s)[1]}</td>
                                            
                                        </tr>}>
                                        <div className='health-record'>
                                            <Popup className='health-record-popup' trigger={
                                                <div className='name' onClick={() => getRecord(s)}>{s["Name"]}</div>
                                            }>
                                                Health record:
                                        <div className='history'>{getAllRecord(s["record"])}</div>
                                            </Popup>
                                            {getStatus(s["Status"])}
                                            <div className='latest-record'>
                                                details:<br></br>
                                                {getLastRecord(s["record"])}
                                                <div className='temp-img'>{getImageURL(s["record"])}</div>
                                            </div>
                                        </div>
                                    </Popup>
                    )}

                </tbody>
            </table>
        </div>
    );
}
export default Table;