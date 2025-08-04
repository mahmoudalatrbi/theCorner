document.getElementById('checkoutButton').addEventListener('click', function () {
    const apiUrl = 'https://raw.githubusercontent.com/mockoon/mock-samples/main/mock-apis/data/adyencom-checkoutservice.json'; // Replace with your API endpoint
    const payload = {
        merchantAccount: 'YourMerchantAccount',
        amount: {
            currency: 'USD',
            value: 5000 // Replace with the actual total amount in minor units (e.g., $50.00 is 5000)
        },
        reference: 'YourReference', // Replace with an order reference
        paymentMethod: {
            type: 'scheme', // Replace with actual payment method details
            encryptedCardNumber: 'test_4111111111111111',
            encryptedExpiryMonth: 'test_03',
            encryptedExpiryYear: 'test_2030',
            encryptedSecurityCode: 'test_737'
        },
        returnUrl: 'https://your-website.com/return' // Replace with your return URL
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('your-username:your-password') // Replace with your API credentials
        },
        body: JSON.stringify(payload)
    };

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful response
            console.log('Checkout successful:', data);
            alert('Checkout successful!');
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the checkout:', error);
            alert('Checkout failed! Please try again.');
        });
});
