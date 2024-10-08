$(document).ready(function() {
    //Fetch the Details data from a JSON file
    fetch("Details.json")
    .then((rawData) => rawData.json())
    .then((Details) => {
        //Array of semester names
        let sem = ["First Year, First Semester",
                    "First Year, Second Semester",
                    "Second Year, First Semester",
                    "Second Year, Second Semester",
                    "Third Year, First Semester",
                    "Third Year, Second Semester",
                    "Fourth Year, First Semester",
                    "Fourth Year, Second Semester"];
        let semcount = 0;

        //Column names and widths
        const columnName = {"Course": 15, 
                            "Description": 25, 
                            "Unit": 8, "Grade": 10, 
                            "Remarks" : 12, 
                            "Course2": 16, 
                            "Term": 25};

        //Iterate through each semester in the Details
        Details.forEach(subjects => {
            //Add semester title
            $(".tablebody").append(
                `<tr class="table-title">
                    <th colspan="7">${sem[semcount++]}</th>
                </tr>`
            );

            //Table header row
            let tableHeadHTML = '';
            for (let x in columnName) {
                tableHeadHTML += `<td width=${columnName[x]}%>${x === 'Course2' ? 'Course' : x}</td>`;
            }
            $(".tablebody").append(
                `<tr class="table-head">${tableHeadHTML}</tr>`
            );

            //Iterate through subjects
            subjects.forEach(subject => {
                let colorClass = '';
                if (subject.Grade === "" && subject.Remarks === "") {
                    colorClass = 'not-taken'; 
                } else if (subject.Remarks === "In progress") {
                    colorClass = 'currently-taken';
                } else {
                    colorClass = 'already-taken'; 
                }

                //Add subject row
                $(".tablebody").append(
                    `<tr class="${colorClass}">
                        <td>${subject.Course}</td>
                        <td>${subject.Description}</td>
                        <td>${subject.Unit}</td>
                        <td>${subject.Grade}</td>
                        <td>${subject.Remarks}</td>
                        <td>${subject.Course}</td>
                        <td>${subject.Term}</td>
                    </tr>`
                );
            });
        });
    });
});
