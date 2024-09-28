export interface CheckInData {
    mood_score : number;
    feelings : string;
    notes : string;
}
export async function getTodayCheckIn() {
    try {
        const response = await fetch(`http://localhost:8080/api/checkins/ischeckin`, {
            method: 'GET',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Today\'s CheckIn:', data);
            return data;
        } else {
            throw new Error(data.message || 'Error fetching today\'s check-in');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function createCheckIn(checkInData : CheckInData) {
    try {
        const response = await fetch(`http://localhost:8080/api/checkins/create`, {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                  // Assuming the token is stored in localStorage
            },
            body: JSON.stringify(checkInData)
        });
        const data = await response.json();
        if (response.ok) {
            console.log('CheckIn Created:', data);
            return data;
        } else {
            throw new Error(data.message || 'Error creating check-in');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


export async function updateCheckIn(checkInData : CheckInData) {
    try {
        const response = await fetch(`http://localhost:8080/api/checkins`, {
            method: 'PUT',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkInData)
        });
        const data = await response.json();
        if (response.ok) {
            console.log('CheckIn Updated:', data);
            return data;
        } else {
            throw new Error(data.message || 'Error updating check-in');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

