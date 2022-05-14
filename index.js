// Your code here

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    let empObj = {
        'firstName': firstName, 
        'familyName': familyName,
        'title': title,
        'payPerHour': payPerHour,
        'timeInEvents': [],
        'timeOutEvents': []
    }
    return empObj;
}

// Creates multiple employee records
function createEmployeeRecords(records) {
    return records.map(createEmployeeRecord);
}

// Add a time in event to the employee record
function createTimeInEvent(empRecord, timeStamp) {
    let dateArr = timeStamp.split(' ')
    let timeInObj = {
        'type':"TimeIn",
        'hour': parseInt(dateArr[1].slice(0,2) + '00'),
        'date': dateArr[0]
    };
    empRecord.timeInEvents.push(timeInObj);

    return empRecord;
}

// Add a time out event to the employee record
function createTimeOutEvent(empRecord, timeStamp) {
    let dateArr = timeStamp.split(' ')
    let timeOutObj = {
        'type':"TimeOut",
        'hour': parseInt(dateArr[1].slice(0,2) + '00'),
        'date': dateArr[0]
    };
    empRecord.timeOutEvents.push(timeOutObj);

    return empRecord;
}

// Calculate the number of hours worked on a date
function hoursWorkedOnDate(empRecord, date) {
    let hourOut, hourIn;
    for (const out of empRecord.timeOutEvents) {
        if (out['date'] === date) {
            hourOut = out['hour']
        }
    };

    for (const inV of empRecord.timeInEvents) {
        if (inV['date'] === date) {
            hourIn = inV['hour']
        }
    };

    return (hourOut-hourIn)/100;
}

// Calculate the total wage earned by an employee on a specific date
function wagesEarnedOnDate(empRecord, date) {
    return hoursWorkedOnDate(empRecord, date) * empRecord.payPerHour;
}

// Calculate the total wages earned by an employee
function allWagesFor(empRecord) {
    // Using the timeInEvents get all the dates the employee
    const datesWorked = empRecord.timeInEvents.map(function (e) {
        return e.date
    })

    let wages = 0;
    wages = datesWorked.reduce(function (totalEmployee, d) {
            return totalEmployee + wagesEarnedOnDate(empRecord, d)
        }, 0);

    // let wages = 0;
    // for (const empDate of datesWorked) {
    //     wages += wagesEarnedOnDate(empRecord, empDate);
    // }

    return wages;
}

function calculatePayroll(arrEmployees) {
    let payroll = 0;
    payroll = arrEmployees.reduce(function(totalEmployee, employee) {
            return totalEmployee + allWagesFor(employee)
        }, 0);

    // for (const employee of arrEmployees) {
    //     payroll += allWagesFor(employee) 
    // }
    return payroll;
}



// Tests
// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// // Earns 324
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
// // Earns 54
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
// // 324 + 54
// console.log(cRecord)
// console.log(allWagesFor(cRecord))    //).to.equal(378)
