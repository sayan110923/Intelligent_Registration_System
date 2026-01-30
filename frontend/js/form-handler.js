/**
 * Form Handler - State/City Dropdowns and Form Logic
 */

// State and City Data
const locationData = {
    'USA': {
        'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
        'Texas': ['Houston', 'Dallas', 'Austin', 'San Antonio'],
        'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
        'New York': ['New York City', 'Buffalo', 'Rochester', 'Albany'],
        'Illinois': ['Chicago', 'Springfield', 'Peoria', 'Rockford']
    },
    'Canada': {
        'Ontario': ['Toronto', 'Ottawa', 'Hamilton', 'London'],
        'Quebec': ['Montreal', 'Quebec City', 'Gatineau', 'Laval'],
        'British Columbia': ['Vancouver', 'Victoria', 'Surrey', 'Burnaby'],
        'Alberta': ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge'],
        'Manitoba': ['Winnipeg', 'Brandon', 'Missinippi', 'Thompson']
    },
    'India': {
        'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Aurangabad'],
        'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
        'Karnataka': ['Bangalore', 'Mangalore', 'Mysore', 'Belgaum'],
        'Delhi': ['New Delhi', 'Delhi', 'Gurgaon', 'Noida'],
        'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra']
    },
    'UK': {
        'England': ['London', 'Manchester', 'Birmingham', 'Leeds'],
        'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee'],
        'Wales': ['Cardiff', 'Swansea', 'Newport', 'Caerphilly'],
        'Northern Ireland': ['Belfast', 'Derry', 'Armagh', 'Lisburn']
    },
    'Australia': {
        'New South Wales': ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast'],
        'Victoria': ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo'],
        'Queensland': ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Townsville'],
        'Western Australia': ['Perth', 'Fremantle', 'Mandurah', 'Bunbury'],
        'South Australia': ['Adelaide', 'Mount Gambier', 'Victor Harbor', 'Port Pirie']
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');

    // Country change event
    if (countrySelect) {
        countrySelect.addEventListener('change', function() {
            const selectedCountry = this.value;

            // Clear and disable state select
            stateSelect.innerHTML = '<option value="">Select State</option>';
            stateSelect.disabled = true;

            // Clear and disable city select
            citySelect.innerHTML = '<option value="">Select City</option>';
            citySelect.disabled = true;

            if (selectedCountry && locationData[selectedCountry]) {
                // Populate states
                const states = Object.keys(locationData[selectedCountry]);
                states.forEach(state => {
                    const option = document.createElement('option');
                    option.value = state;
                    option.textContent = state;
                    stateSelect.appendChild(option);
                });

                stateSelect.disabled = false;
            }
        });
    }

    // State change event
    if (stateSelect) {
        stateSelect.addEventListener('change', function() {
            const selectedCountry = countrySelect.value;
            const selectedState = this.value;

            // Clear and disable city select
            citySelect.innerHTML = '<option value="">Select City</option>';
            citySelect.disabled = true;

            if (selectedCountry && selectedState && locationData[selectedCountry][selectedState]) {
                // Populate cities
                const cities = locationData[selectedCountry][selectedState];
                cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });

                citySelect.disabled = false;
            }
        });
    }
});
